import { Component, afterNextRender, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { apiErrorMessage } from '../../interceptors/api-error';
import { Loan, LoanStatus } from '../../models/loan';
import { Book } from '../../models/book';
import { BookCopy } from '../../models/copy';
import { LoanService } from '../../services/loan';
import { BookService } from '../../services/book';
import { CopyService } from '../../services/copy';
import { ExpandableSearchComponent } from '../expandable-search/expandable-search';
import { FilterMenuComponent } from '../filter-menu/filter-menu';
import { SortMenuComponent, SortOption } from '../sort-menu/sort-menu';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [ExpandableSearchComponent, FilterMenuComponent, SortMenuComponent, MatButtonModule, MatFormFieldModule, MatIcon, MatInputModule, MatPaginatorModule, MatSelectModule, RouterLink],
  templateUrl: './loans.html',
  styleUrl: './loans.css',
})
export class LoansComponent {
  private readonly loanService = inject(LoanService);
  private readonly bookService = inject(BookService);
  private readonly copyService = inject(CopyService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly loans = signal<Loan[]>([]);
  readonly totalLoans = signal(0);
  readonly status = signal<LoanStatus>('ACTIVE');
  readonly searchTerm = signal('');
  readonly checkoutFrom = signal('');
  readonly checkoutTo = signal('');
  readonly dueFrom = signal('');
  readonly dueTo = signal('');
  readonly issuedBy = signal('');
  readonly overdueRange = signal('');
  readonly sortBy = signal('checkoutDate,desc');
  readonly loading = signal(true);
  readonly error = signal('');
  readonly memberId = signal<number | null>(null);
  readonly bookId = signal<number | null>(null);
  readonly copyId = signal<number | null>(null);
  readonly bookFilterLabel = signal('');
  readonly copyFilterLabel = signal('');
  readonly books = signal<Book[]>([]);
  readonly copies = signal<BookCopy[]>([]);
  readonly activeFilterCount = computed(() => [this.bookId(), this.copyId(), this.checkoutFrom(), this.checkoutTo(), this.dueFrom(), this.dueTo(), this.issuedBy(), this.overdueRange()].filter(Boolean).length);

  readonly filters: { value: LoanStatus; label: string; icon: string }[] = [
    { value: 'ACTIVE', label: 'Aktif', icon: 'schedule' },
    { value: 'OVERDUE', label: 'Geciken', icon: 'warning' },
    { value: 'ALL', label: 'Tüm işlemler', icon: 'receipt_long' },
  ];
  readonly sortOptions: SortOption[] = [
    { value: 'checkoutDate,desc', label: 'En yeni işlemler' },
    { value: 'checkoutDate,asc', label: 'En eski işlemler' },
    { value: 'dueDate,asc', label: 'Son iade tarihi yaklaşan' },
    { value: 'dueDate,desc', label: 'Son iade tarihi uzak olan' },
    { value: 'bookCopy.book.title,asc', label: 'Kitap adı (A–Z)' },
    { value: 'member.lastName,asc', label: 'Üye soyadı (A–Z)' },
  ];

  pageSize = 20;
  currentPage = 0;

  constructor() {
    const query = this.route.snapshot.queryParamMap;
    const requestedStatus = query.get('status') as LoanStatus | null;
    if (requestedStatus && ['ALL', 'ACTIVE', 'OVERDUE'].includes(requestedStatus)) this.status.set(requestedStatus);
    const requestedMember = Number(query.get('memberId'));
    if (requestedMember) this.memberId.set(requestedMember);
    const requestedBook = Number(query.get('bookId'));
    if (requestedBook) this.bookId.set(requestedBook);
    const requestedCopy = Number(query.get('copyId'));
    if (requestedCopy) this.copyId.set(requestedCopy);
    this.searchTerm.set(query.get('search') || '');
    this.checkoutFrom.set(query.get('checkoutFrom') || '');
    this.checkoutTo.set(query.get('checkoutTo') || '');
    this.dueFrom.set(query.get('dueFrom') || '');
    this.dueTo.set(query.get('dueTo') || '');
    this.issuedBy.set(query.get('issuedBy') || '');
    this.overdueRange.set(query.get('overdueRange') || '');
    this.sortBy.set(query.get('sort') || 'checkoutDate,desc');
    afterNextRender(() => { this.loadFilterOptions(); this.loadContextLabels(); this.loadLoans(); });
  }

  loadLoans(): void {
    this.loading.set(true);
    this.error.set('');
    this.loanService.list(this.status(), this.currentPage, this.pageSize, this.memberId() || undefined, {
      search: this.searchTerm().trim(), bookId: this.bookId() || undefined, copyId: this.copyId() || undefined,
      checkoutFrom: this.checkoutFrom(), checkoutTo: this.checkoutTo(),
      dueFrom: this.dueFrom(), dueTo: this.dueTo(), issuedBy: this.issuedBy().trim(), overdueRange: this.overdueRange(),
    }, this.sortBy()).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (response) => { this.loans.set(response.content); this.totalLoans.set(response.totalElements); },
      error: (error) => this.error.set(apiErrorMessage(error)),
    });
  }

  search(): void { this.currentPage = 0; this.syncUrl(); this.loadLoans(); }
  clearSearch(): void { this.searchTerm.set(''); this.search(); }
  applyFilters(): void { this.currentPage = 0; this.syncUrl(); this.loadLoans(); }
  clearFilters(): void {
    this.bookId.set(null); this.copyId.set(null); this.bookFilterLabel.set(''); this.copyFilterLabel.set(''); this.copies.set([]);
    this.checkoutFrom.set(''); this.checkoutTo.set(''); this.dueFrom.set(''); this.dueTo.set(''); this.issuedBy.set(''); this.overdueRange.set('');
    this.applyFilters();
  }
  selectBookFilter(bookId: number | null): void {
    this.bookId.set(bookId);
    this.bookFilterLabel.set(this.books().find((book) => book.id === bookId)?.title || '');
    this.copyId.set(null);
    this.copyFilterLabel.set('');
    this.loadCopiesForBook(bookId);
  }
  selectCopyFilter(copyId: number | null): void {
    this.copyId.set(copyId);
    const copy = this.copies().find((candidate) => candidate.id === copyId);
    this.copyFilterLabel.set(copy ? `${copy.inventoryNumber} · ${copy.book.title}` : '');
  }
  changeStatus(status: LoanStatus): void { this.status.set(status); this.currentPage = 0; this.syncUrl(); this.loadLoans(); }
  changeSort(value: string): void { this.sortBy.set(value); this.currentPage = 0; this.syncUrl(); this.loadLoans(); }
  clearMemberFilter(): void { this.memberId.set(null); this.currentPage = 0; this.syncUrl(); this.loadLoans(); }
  clearBookFilter(): void { this.selectBookFilter(null); this.currentPage = 0; this.syncUrl(); this.loadLoans(); }
  clearCopyFilter(): void { this.selectCopyFilter(null); this.currentPage = 0; this.syncUrl(); this.loadLoans(); }
  onPageChange(event: PageEvent): void { this.currentPage = event.pageIndex; this.pageSize = event.pageSize; this.loadLoans(); }

  private syncUrl(): void {
    void this.router.navigate([], { relativeTo: this.route, queryParamsHandling: 'merge', queryParams: {
      status: this.status() === 'ACTIVE' ? null : this.status(), memberId: this.memberId(), bookId: this.bookId(), copyId: this.copyId(), search: this.searchTerm().trim() || null,
      checkoutFrom: this.checkoutFrom() || null, checkoutTo: this.checkoutTo() || null, dueFrom: this.dueFrom() || null,
      dueTo: this.dueTo() || null, issuedBy: this.issuedBy().trim() || null, overdueRange: this.overdueRange() || null,
      sort: this.sortBy() === 'checkoutDate,desc' ? null : this.sortBy(),
    } });
  }

  private loadContextLabels(): void {
    const bookId = this.bookId();
    if (bookId) this.bookService.getBook(bookId).subscribe({ next: (book) => this.bookFilterLabel.set(book.title) });
    const copyId = this.copyId();
    if (copyId) this.copyService.get(copyId).subscribe({ next: (copy) => {
      this.copyFilterLabel.set(`${copy.inventoryNumber} · ${copy.book.title}`);
      if (!this.bookId()) this.copies.set([copy]);
    } });
  }

  private loadFilterOptions(): void {
    this.bookService.getBooks('', 0, 500).subscribe({ next: (response) => {
      this.books.set(response.content);
      const bookId = this.bookId();
      if (bookId) {
        this.bookFilterLabel.set(response.content.find((book) => book.id === bookId)?.title || this.bookFilterLabel());
        this.loadCopiesForBook(bookId);
      }
    } });
  }

  private loadCopiesForBook(bookId: number | null): void {
    if (!bookId) { this.copies.set([]); return; }
    this.copyService.list('', undefined, 0, 500, '', bookId).subscribe({ next: (response) => this.copies.set(response.content) });
  }

  formatDate(value: string | null): string { return value ? new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${value}T00:00:00`)) : '—'; }
  loanState(loan: Loan): string { return loan.returnDate ? 'İade edildi' : loan.overdue ? 'Gecikmiş' : 'Aktif'; }
  stateClass(loan: Loan): string { return loan.returnDate ? 'returned' : loan.overdue ? 'overdue' : 'active'; }
}
