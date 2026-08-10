import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Author, Book, BookRequest, Genre, Publisher } from '../../models/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatIcon, MatInputModule, MatSelectModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookFormComponent implements OnChanges {
  private readonly fb = inject(FormBuilder);

  @Input() book: Book | null = null;
  @Input() authors: Author[] = [];
  @Input() publishers: Publisher[] = [];
  @Input() initialAuthorId: number | null = null;
  @Input() initialPublisherId: number | null = null;
  @Input() submitting = false;
  @Input() error = '';
  @Output() save = new EventEmitter<BookRequest>();
  @Output() cancel = new EventEmitter<void>();

  readonly genres: { value: Genre; label: string }[] = [
    { value: 'KURGU', label: 'Kurgu' },
    { value: 'KURGU_DISI', label: 'Kurgu dışı' },
    { value: 'BILIMKURGU', label: 'Bilimkurgu' },
    { value: 'FANTASTIK', label: 'Fantastik' },
    { value: 'GIZEM', label: 'Gizem' },
    { value: 'TARIH', label: 'Tarih' },
    { value: 'BIYOGRAFI', label: 'Biyografi' },
    { value: 'TEKNOLOJI', label: 'Teknoloji' },
  ];

  readonly form = this.fb.group({
    title: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(255)]),
    isbn: this.fb.nonNullable.control('', Validators.required),
    publicationYear: this.fb.control<number | null>(null),
    genre: this.fb.nonNullable.control<Genre>('KURGU', Validators.required),
    publisherId: this.fb.control<number | null>(null),
    authorIds: this.fb.nonNullable.control<number[]>([]),
    coverImageUrl: this.fb.control<string | null>(null),
    summary: this.fb.control<string | null>(null),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['book'] && !changes['initialAuthorId'] && !changes['initialPublisherId']) return;
    const book = this.book;
    this.form.reset({
      title: book?.title ?? '',
      isbn: book?.isbn ?? '',
      publicationYear: book?.publicationYear ?? null,
      genre: book?.genre ?? 'KURGU',
      publisherId: book?.publisher?.id ?? this.initialPublisherId,
      authorIds: book?.authors.map((author) => author.id) ?? (this.initialAuthorId ? [this.initialAuthorId] : []),
      coverImageUrl: book?.coverImageUrl ?? null,
      summary: book?.summary ?? null,
    });
  }

  coverPreview(): string | null {
    const value = this.form.controls.coverImageUrl.value?.trim();
    if (!value) return null;
    return value;
  }

  submit(): void {
    if (this.form.invalid || this.submitting) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.save.emit({
      ...value,
      title: value.title.trim(),
      isbn: value.isbn.trim(),
      coverImageUrl: value.coverImageUrl?.trim() || null,
      summary: value.summary?.trim() || null,
    });
  }
}
