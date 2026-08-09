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
import { finalize, forkJoin } from 'rxjs';
import { apiErrorMessage } from '../../interceptors/api-error';
import { Author, Book, BookRequest, Genre, Publisher } from '../../models/book';
import { BookService } from '../../services/book';
import { BookDetailComponent } from '../book-detail/book-detail';
import { BookFormComponent } from '../book-form/book-form';
import { ExpandableSearchComponent } from '../expandable-search/expandable-search';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, BookDetailComponent, BookFormComponent, ExpandableSearchComponent, MatButtonModule, MatFormFieldModule, MatIcon, MatInputModule, MatPaginatorModule, MatSelectModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  private readonly bookService = inject(BookService);
  private readonly route = inject(ActivatedRoute);

  readonly books = signal<Book[]>([]);
  readonly authors = signal<Author[]>([]);
  readonly publishers = signal<Publisher[]>([]);
  readonly totalBooks = signal(0);
  readonly searchTerm = signal('');
  readonly sortBy = signal('title');
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
    this.bookService.getBooks(this.searchTerm().trim(), this.currentPage, this.pageSize, this.sortBy())
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
