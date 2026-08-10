import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { finalize } from 'rxjs';
import { apiErrorMessage } from '../../interceptors/api-error';
import { Book } from '../../models/book';
import { BookCopy, CopyStatus } from '../../models/copy';
import { BookService } from '../../services/book';
import { CopyService } from '../../services/copy';

@Component({
  selector: 'app-copy-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatIcon, MatInputModule, MatSelectModule],
  templateUrl: './copy-form.html',
  styleUrl: './copy-form.css',
})
export class CopyFormComponent implements OnChanges {
  private readonly fb = inject(FormBuilder);
  private readonly bookService = inject(BookService);
  private readonly copyService = inject(CopyService);

  @Input() copy: BookCopy | null = null;
  @Input() initialBookId: number | null = null;
  @Output() saved = new EventEmitter<BookCopy>();
  @Output() cancel = new EventEmitter<void>();

  readonly books = signal<Book[]>([]);
  readonly bookSearchPerformed = signal(false);
  readonly selectedBook = signal<Book | null>(null);
  readonly bookSearch = signal('');
  readonly loadingBooks = signal(false);
  readonly submitting = signal(false);
  readonly error = signal('');
  readonly form = this.fb.group({
    physicalLocation: this.fb.nonNullable.control('', Validators.maxLength(255)),
    notes: this.fb.nonNullable.control('', Validators.maxLength(2000)),
    status: this.fb.nonNullable.control<CopyStatus>('AVAILABLE'),
  });
  readonly statuses: { value: CopyStatus; label: string }[] = [
    { value: 'AVAILABLE', label: 'Ödünç verilebilir' },
    { value: 'MAINTENANCE', label: 'Bakımda' },
    { value: 'LOST', label: 'Kayıp' },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['copy']) {
      this.form.reset({ physicalLocation: this.copy?.physicalLocation ?? '', notes: this.copy?.notes ?? '', status: this.copy?.status ?? 'AVAILABLE' });
      this.selectedBook.set(null);
      this.error.set('');
    }
    if (!this.copy && this.initialBookId && (changes['initialBookId'] || changes['copy'])) {
      this.loadingBooks.set(true);
      this.bookService.getBook(this.initialBookId).pipe(finalize(() => this.loadingBooks.set(false))).subscribe({
        next: (book) => this.selectedBook.set(book), error: (error) => this.error.set(apiErrorMessage(error)),
      });
    }
  }

  searchBooks(): void {
    const search = this.bookSearch().trim();
    if (!search) {
      this.books.set([]);
      this.bookSearchPerformed.set(false);
      return;
    }
    this.bookSearchPerformed.set(true);
    this.loadingBooks.set(true);
    this.bookService.getBooks(search, 0, 20)
      .pipe(finalize(() => this.loadingBooks.set(false)))
      .subscribe({ next: (response) => this.books.set(response.content), error: (error) => this.error.set(apiErrorMessage(error)) });
  }

  coverUrl(book: Book): string | null {
    const value = book.coverImageUrl?.trim();
    if (!value) return null;
    return value;
  }

  submit(): void {
    if (this.submitting()) return;
    if (!this.copy && !this.selectedBook()) { this.error.set('Nüshanın ekleneceği kitabı seçin.'); return; }
    const location = this.form.controls.physicalLocation.value.trim();
    const notes = this.form.controls.notes.value.trim();
    const request = this.copy
      ? this.copyService.update(this.copy.id, { physicalLocation: location, notes, status: this.copy.status === 'LOANED' ? undefined : this.form.controls.status.value })
      : this.copyService.add(this.selectedBook()!.id, location, notes);
    this.submitting.set(true);
    this.error.set('');
    request.pipe(finalize(() => this.submitting.set(false))).subscribe({
      next: (copy) => this.saved.emit(copy),
      error: (error) => this.error.set(apiErrorMessage(error)),
    });
  }
}
