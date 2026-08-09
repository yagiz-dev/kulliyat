import { CommonModule } from '@angular/common';
import { Component, afterNextRender, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { apiErrorMessage } from '../../interceptors/api-error';
import { Author, Book, BookRequest, Genre, Publisher } from '../../models/book';
import { BookService } from '../../services/book';
import { BookDetailComponent } from '../book-detail/book-detail';
import { BookFormComponent } from '../book-form/book-form';
import { ExpandableSearchComponent } from '../expandable-search/expandable-search';
import { FilterMenuComponent } from '../filter-menu/filter-menu';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, BookDetailComponent, BookFormComponent, ExpandableSearchComponent, FilterMenuComponent, MatButtonModule, MatFormFieldModule, MatIcon, MatInputModule, MatPaginatorModule, MatSelectModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  private readonly bookService = inject(BookService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly books = signal<Book[]>([]);
  readonly authors = signal<Author[]>([]);
  readonly publishers = signal<Publisher[]>([]);
  readonly totalBooks = signal(0);
  readonly searchTerm = signal('');
  readonly sortBy = signal('title');
  readonly genreFilter = signal<Genre | ''>('');
  readonly authorFilter = signal<number | null>(null);
  readonly publisherFilter = signal<number | null>(null);
  readonly yearFrom = signal<number | null>(null);
  readonly yearTo = signal<number | null>(null);
  readonly activeFilterCount = computed(() => [this.genreFilter(), this.authorFilter(), this.publisherFilter(), this.yearFrom(), this.yearTo()].filter(Boolean).length);
  readonly genres: { value: Genre; label: string }[] = [
    { value: 'KURGU', label: 'Kurgu' }, { value: 'KURGU_DISI', label: 'Kurgu dışı' }, { value: 'BILIMKURGU', label: 'Bilimkurgu' },
    { value: 'FANTASTIK', label: 'Fantastik' }, { value: 'GIZEM', label: 'Gizem' }, { value: 'TARIH', label: 'Tarih' },
    { value: 'BIYOGRAFI', label: 'Biyografi' }, { value: 'TEKNOLOJI', label: 'Teknoloji' },
  ];
  readonly loading = signal(true);
  readonly error = signal('');
  readonly formOpen = signal(false);
  readonly editingBook = signal<Book | null>(null);
  readonly selectedBook = signal<Book | null>(null);
  readonly submitting = signal(false);
  readonly formError = signal('');
  pageSize = 12;
  currentPage = 0;

  constructor() {
    const query = this.route.snapshot.queryParamMap;
    this.genreFilter.set((query.get('genre') as Genre) || '');
    this.authorFilter.set(query.get('authorId') ? Number(query.get('authorId')) : null);
    this.publisherFilter.set(query.get('publisherId') ? Number(query.get('publisherId')) : null);
    this.yearFrom.set(query.get('yearFrom') ? Number(query.get('yearFrom')) : null);
    this.yearTo.set(query.get('yearTo') ? Number(query.get('yearTo')) : null);
    afterNextRender(() => {
      this.loadBooks();
      this.loadAuthorities();
      if (this.route.snapshot.queryParamMap.get('create') === 'true') this.openCreate();
    });
  }

  authorNames(book: Book): string { return book.authors.map((author) => author.name).join(', '); }

  coverUrl(book: Book): string | null {
    const value = book.coverImageUrl?.trim();
    if (!value) return null;
    return value;
  }

  genreLabel(genre: Genre): string {
    return ({ KURGU: 'Kurgu', KURGU_DISI: 'Kurgu dışı', BILIMKURGU: 'Bilimkurgu', FANTASTIK: 'Fantastik', GIZEM: 'Gizem', TARIH: 'Tarih', BIYOGRAFI: 'Biyografi', TEKNOLOJI: 'Teknoloji' })[genre];
  }

  loadBooks(): void {
    this.loading.set(true);
    this.error.set('');
    this.bookService.getBooks(this.searchTerm().trim(), this.currentPage, this.pageSize, this.sortBy(), {
      genre: this.genreFilter() || undefined, authorId: this.authorFilter() || undefined,
      publisherId: this.publisherFilter() || undefined, yearFrom: this.yearFrom() || undefined, yearTo: this.yearTo() || undefined,
    })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => { this.books.set(response.content); this.totalBooks.set(response.totalElements); },
        error: (error) => this.error.set(apiErrorMessage(error)),
      });
  }

  loadAuthorities(): void {
    forkJoin({ authors: this.bookService.getAuthors(), publishers: this.bookService.getPublishers() }).subscribe({
      next: ({ authors, publishers }) => { this.authors.set(authors); this.publishers.set(publishers); },
      error: (error) => this.error.set(apiErrorMessage(error)),
    });
  }

  search(): void { this.currentPage = 0; this.loadBooks(); }
  clearSearch(): void { this.searchTerm.set(''); this.search(); }
  applyFilters(): void { this.currentPage = 0; this.syncFilterUrl(); this.loadBooks(); }
  clearFilters(): void { this.genreFilter.set(''); this.authorFilter.set(null); this.publisherFilter.set(null); this.yearFrom.set(null); this.yearTo.set(null); this.applyFilters(); }
  private syncFilterUrl(): void { void this.router.navigate([], { relativeTo: this.route, queryParamsHandling: 'merge', queryParams: { genre: this.genreFilter() || null, authorId: this.authorFilter(), publisherId: this.publisherFilter(), yearFrom: this.yearFrom(), yearTo: this.yearTo() } }); }
  changeSort(value: string): void { this.sortBy.set(value); this.currentPage = 0; this.loadBooks(); }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadBooks();
  }

  openCreate(): void { this.editingBook.set(null); this.formError.set(''); this.formOpen.set(true); }
  openEdit(book: Book): void { this.selectedBook.set(null); this.editingBook.set(book); this.formError.set(''); this.formOpen.set(true); }
  closeForm(): void { if (!this.submitting()) this.formOpen.set(false); }

  saveBook(request: BookRequest): void {
    const book = this.editingBook();
    const operation = book ? this.bookService.updateBook(book.id, request) : this.bookService.createBook(request);
    this.submitting.set(true);
    this.formError.set('');
    operation.pipe(finalize(() => this.submitting.set(false))).subscribe({
      next: () => { this.formOpen.set(false); this.loadBooks(); },
      error: (error) => this.formError.set(apiErrorMessage(error)),
    });
  }

  removeBook(book: Book): void {
    if (!confirm(`“${book.title}” kitabını silmek istediğinizden emin misiniz?`)) return;
    this.bookService.deleteBook(book.id).subscribe({
      next: () => { this.selectedBook.set(null); this.loadBooks(); },
      error: (error) => this.error.set(apiErrorMessage(error)),
    });
  }
}
