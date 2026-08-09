import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Book, Genre } from '../../models/book';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIcon, RouterLink],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetailComponent {
  @Input({ required: true }) book!: Book;
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Book>();
  @Output() remove = new EventEmitter<Book>();

  authorNames(): string { return this.book.authors.map((author) => author.name).join(', '); }
  coverUrl(): string | null {
    const value = this.book.coverImageUrl?.trim();
    if (!value) return null;
    return value;
  }
  genreLabel(genre: Genre): string {
    return ({ KURGU: 'Kurgu', KURGU_DISI: 'Kurgu dışı', BILIMKURGU: 'Bilimkurgu', FANTASTIK: 'Fantastik', GIZEM: 'Gizem', TARIH: 'Tarih', BIYOGRAFI: 'Biyografi', TEKNOLOJI: 'Teknoloji' })[genre];
  }
}
