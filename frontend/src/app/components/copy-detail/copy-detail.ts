import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { BookSummary } from '../../models/book';
import { BookCopy, CopyStatus } from '../../models/copy';

@Component({ selector: 'app-copy-detail', standalone: true, imports: [CommonModule, MatButtonModule, MatIcon], templateUrl: './copy-detail.html', styleUrl: './copy-detail.css' })
export class CopyDetailComponent {
  @Input({ required: true }) copy!: BookCopy;
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<BookCopy>();
  statusLabel(status: CopyStatus): string { return ({ AVAILABLE: 'Ödünç verilebilir', LOANED: 'Ödünçte', MAINTENANCE: 'Bakımda', LOST: 'Kayıp' })[status]; }
  coverUrl(book: BookSummary): string | null {
    const value = book.coverImageUrl?.trim();
    if (!value) return null;
    return value;
  }
}
