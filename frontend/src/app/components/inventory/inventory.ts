import { CommonModule } from '@angular/common';
import { Component, afterNextRender, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { apiErrorMessage } from '../../interceptors/api-error';
import { Book, BookSummary } from '../../models/book';
import { BookCopy, CopyStatus } from '../../models/copy';
import { CopyService } from '../../services/copy';
import { BookService } from '../../services/book';
import { CopyDetailComponent } from '../copy-detail/copy-detail';
import { CopyFormComponent } from '../copy-form/copy-form';
import { ExpandableSearchComponent } from '../expandable-search/expandable-search';
import { FilterMenuComponent } from '../filter-menu/filter-menu';
import { SortMenuComponent, SortOption } from '../sort-menu/sort-menu';
import { LabelPrintDialogComponent } from '../label-print-dialog/label-print-dialog';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, CopyDetailComponent, CopyFormComponent, LabelPrintDialogComponent, ExpandableSearchComponent, FilterMenuComponent, SortMenuComponent, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIcon, MatInputModule, MatPaginatorModule, MatSelectModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class InventoryComponent {
  private readonly copyService = inject(CopyService);
  private readonly bookService = inject(BookService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly copies = signal<BookCopy[]>([]);
  readonly totalCopies = signal(0);
  readonly searchTerm = signal('');
  readonly statusFilter = signal<CopyStatus | ''>('');
  readonly locationFilter = signal('');
  readonly bookFilter = signal<number | null>(null);
  readonly books = signal<Book[]>([]);
  readonly sortBy = signal('inventoryNumber,asc');
  readonly sortOptions: SortOption[] = [
    { value: 'inventoryNumber,asc', label: 'Envanter no. (artan)' }, { value: 'inventoryNumber,desc', label: 'Envanter no. (azalan)' },
    { value: 'book.title,asc', label: 'Kitap adı (A–Z)' }, { value: 'status,asc', label: 'Duruma göre' },
    { value: 'physicalLocation,asc', label: 'Konuma göre' },
  ];
  readonly activeFilterCount = computed(() => [this.statusFilter(), this.locationFilter().trim(), this.bookFilter()].filter(Boolean).length);
  readonly loading = signal(true);
  readonly error = signal('');
  readonly selectedCopy = signal<BookCopy | null>(null);
  readonly editingCopy = signal<BookCopy | null>(null);
  readonly formOpen = signal(false);
  readonly createdCopy = signal<BookCopy | null>(null);
  readonly selectedCopyIds = signal<Set<number>>(new Set());
  readonly labelCopyIds = signal<number[]>([]);
  readonly labelDialogOpen = signal(false);
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
    const query = this.route.snapshot.queryParamMap;
    this.searchTerm.set(query.get('search') || '');
    this.statusFilter.set((query.get('status') as CopyStatus) || '');
    this.locationFilter.set(query.get('location') || '');
    this.bookFilter.set(query.get('bookId') ? Number(query.get('bookId')) : null);
    this.sortBy.set(query.get('sort') || 'inventoryNumber,asc');
    afterNextRender(() => {
      this.loadCopies();
      this.bookService.getBooks('', 0, 500).subscribe((response) => this.books.set(response.content));
      if (this.route.snapshot.queryParamMap.get('create') === 'true') this.openCreate();
    });
  }

  loadCopies(): void {
    this.loading.set(true);
    this.error.set('');
    const [sortBy, sortDirection] = this.sortBy().split(',');
    this.copyService.list(this.searchTerm().trim(), this.statusFilter() || undefined, this.currentPage, this.pageSize, this.locationFilter().trim(), this.bookFilter() || undefined, sortBy, sortDirection)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => { this.copies.set(response.content); this.totalCopies.set(response.totalElements); },
        error: (error) => this.error.set(apiErrorMessage(error)),
      });
  }

  search(): void { this.currentPage = 0; this.syncSearchUrl(); this.loadCopies(); }
  clearSearch(): void { this.searchTerm.set(''); this.search(); }
  applyFilters(): void { this.currentPage = 0; this.syncFilterUrl(); this.loadCopies(); }
  clearFilters(): void { this.statusFilter.set(''); this.locationFilter.set(''); this.bookFilter.set(null); this.applyFilters(); }
  changeSort(value: string): void { this.sortBy.set(value); this.currentPage = 0; void this.router.navigate([], { relativeTo: this.route, queryParamsHandling: 'merge', queryParams: { sort: value === 'inventoryNumber,asc' ? null : value } }); this.loadCopies(); }
  private syncFilterUrl(): void { void this.router.navigate([], { relativeTo: this.route, queryParamsHandling: 'merge', queryParams: { status: this.statusFilter() || null, location: this.locationFilter().trim() || null, bookId: this.bookFilter() } }); }
  private syncSearchUrl(): void { void this.router.navigate([], { relativeTo: this.route, queryParamsHandling: 'merge', queryParams: { search: this.searchTerm().trim() || null } }); }
  onPageChange(event: PageEvent): void { this.currentPage = event.pageIndex; this.pageSize = event.pageSize; this.loadCopies(); }

  isSelected(copy: BookCopy): boolean { return this.selectedCopyIds().has(copy.id); }
  allPageSelected(): boolean { return this.copies().length > 0 && this.copies().every((copy) => this.isSelected(copy)); }
  somePageSelected(): boolean { return this.copies().some((copy) => this.isSelected(copy)) && !this.allPageSelected(); }
  toggleCopy(copy: BookCopy, selected: boolean): void {
    const ids = new Set(this.selectedCopyIds());
    selected ? ids.add(copy.id) : ids.delete(copy.id);
    this.selectedCopyIds.set(ids);
  }
  togglePage(selected: boolean): void {
    const ids = new Set(this.selectedCopyIds());
    this.copies().forEach((copy) => selected ? ids.add(copy.id) : ids.delete(copy.id));
    this.selectedCopyIds.set(ids);
  }
  clearSelection(): void { this.selectedCopyIds.set(new Set()); }
  openSelectedLabels(): void { this.openLabels([...this.selectedCopyIds()]); }
  openLabels(ids: number[]): void {
    if (!ids.length) return;
    this.labelCopyIds.set(ids);
    this.labelDialogOpen.set(true);
  }
  closeLabels(): void { this.labelDialogOpen.set(false); }

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
    if (wasCreate) {
      this.createdCopy.set(copy);
      this.searchTerm.set(copy.inventoryNumber);
      this.statusFilter.set('');
      this.locationFilter.set('');
      this.bookFilter.set(null);
      this.currentPage = 0;
      this.clearSelection();
      void this.router.navigate([], { relativeTo: this.route, queryParamsHandling: 'merge', queryParams: {
        search: copy.inventoryNumber, status: null, location: null, bookId: null, create: null,
      } });
    }
    this.loadCopies();
  }
}
