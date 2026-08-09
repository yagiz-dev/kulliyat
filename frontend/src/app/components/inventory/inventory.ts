import { CommonModule } from '@angular/common';
import { Component, afterNextRender, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { apiErrorMessage } from '../../interceptors/api-error';
import { BookSummary } from '../../models/book';
import { BookCopy, CopyStatus } from '../../models/copy';
import { CopyService } from '../../services/copy';
import { CopyDetailComponent } from '../copy-detail/copy-detail';
import { CopyFormComponent } from '../copy-form/copy-form';
import { ExpandableSearchComponent } from '../expandable-search/expandable-search';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, CopyDetailComponent, CopyFormComponent, ExpandableSearchComponent, MatButtonModule, MatFormFieldModule, MatIcon, MatInputModule, MatPaginatorModule, MatSelectModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class InventoryComponent {
  private readonly copyService = inject(CopyService);
  private readonly route = inject(ActivatedRoute);

  readonly copies = signal<BookCopy[]>([]);
  readonly totalCopies = signal(0);
  readonly searchTerm = signal('');
  readonly statusFilter = signal<CopyStatus | ''>('');
  readonly loading = signal(true);
  readonly error = signal('');
  readonly selectedCopy = signal<BookCopy | null>(null);
  readonly editingCopy = signal<BookCopy | null>(null);
  readonly formOpen = signal(false);
  readonly createdCopy = signal<BookCopy | null>(null);
  pageSize = 20;
  currentPage = 0;

  readonly statuses: { value: CopyStatus | ''; label: string }[] = [
    { value: '', label: 'Tüm durumlar' },
    { value: 'AVAILABLE', label: 'Ödünç verilebilir' },
    { value: 'LOANED', label: 'Ödünçte' },
    { value: 'MAINTENANCE', label: 'Bakımda' },
    { value: 'LOST', label: 'Kayıp' },
  ];

  constructor() {
    afterNextRender(() => {
      this.loadCopies();
      if (this.route.snapshot.queryParamMap.get('create') === 'true') this.openCreate();
    });
  }

  loadCopies(): void {
    this.loading.set(true);
    this.error.set('');
    this.copyService.list(this.searchTerm().trim(), this.statusFilter() || undefined, this.currentPage, this.pageSize)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => { this.copies.set(response.content); this.totalCopies.set(response.totalElements); },
        error: (error) => this.error.set(apiErrorMessage(error)),
      });
  }

  search(): void { if (this.searchTerm().trim()) this.statusFilter.set(''); this.currentPage = 0; this.loadCopies(); }
  clearSearch(): void { this.searchTerm.set(''); this.search(); }
  changeStatus(status: CopyStatus | ''): void { this.statusFilter.set(status); if (status) this.searchTerm.set(''); this.currentPage = 0; this.loadCopies(); }
  onPageChange(event: PageEvent): void { this.currentPage = event.pageIndex; this.pageSize = event.pageSize; this.loadCopies(); }

  statusLabel(status: CopyStatus): string {
    return ({ AVAILABLE: 'Ödünç verilebilir', LOANED: 'Ödünçte', MAINTENANCE: 'Bakımda', LOST: 'Kayıp' })[status];
  }

  coverUrl(book: BookSummary): string | null {
    const value = book.coverImageUrl?.trim();
    if (!value) return null;
    return value;
  }

  openCreate(): void { this.editingCopy.set(null); this.formOpen.set(true); }
  openEdit(copy: BookCopy): void { this.selectedCopy.set(null); this.editingCopy.set(copy); this.formOpen.set(true); }
  closeForm(): void { this.formOpen.set(false); }
  copySaved(copy: BookCopy): void {
    const wasCreate = !this.editingCopy();
    this.formOpen.set(false);
    this.editingCopy.set(null);
    if (wasCreate) this.createdCopy.set(copy);
    this.loadCopies();
  }
}
