import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';
import { Book, BookSummary } from '../../models/book';
import { BookCopy, CopyStatus } from '../../models/copy';
import { Loan } from '../../models/loan';
import { BookService } from '../../services/book';
import { LoanService } from '../../services/loan';

@Component({ selector: 'app-copy-detail', standalone: true, imports: [CommonModule, MatButtonModule, MatIcon, RouterLink], templateUrl: './copy-detail.html', styleUrl: './copy-detail.css' })
export class CopyDetailComponent implements OnChanges {
  private readonly loanService = inject(LoanService);
  private readonly bookService = inject(BookService);
  @Input({ required: true }) copy!: BookCopy;
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<BookCopy>();
  @Output() printLabel = new EventEmitter<BookCopy>();
  readonly activeLoan = signal<Loan | null>(null);
  readonly totalLoanCount = signal(0);
  readonly bookDetails = signal<Book | null>(null);
  readonly loadingDetails = signal(false);

  ngOnChanges(): void {
    if (!this.copy) return;
    this.loadingDetails.set(true);
    forkJoin({
      book: this.bookService.getBook(this.copy.book.id).pipe(catchError(() => of(null))),
      active: this.loanService.list('ACTIVE', 0, 1, undefined, { copyId: this.copy.id }).pipe(catchError(() => of(null))),
      history: this.loanService.list('ALL', 0, 1, undefined, { copyId: this.copy.id }).pipe(catchError(() => of(null))),
    }).subscribe(({ book, active, history }) => {
      this.bookDetails.set(book);
      this.activeLoan.set(active?.content[0] ?? null);
      this.totalLoanCount.set(history?.totalElements ?? 0);
      this.loadingDetails.set(false);
    });
  }

  statusLabel(status: CopyStatus): string { return ({ AVAILABLE: 'Ödünç verilebilir', LOANED: 'Ödünçte', MAINTENANCE: 'Bakımda', LOST: 'Kayıp' })[status]; }
  coverUrl(book: BookSummary): string | null { return book.coverImageUrl?.trim() || null; }
  authorNames(): string { return this.bookDetails()?.authors.map((author) => author.name).join(', ') || 'Belirtilmemiş'; }
  formatDate(value: string): string { return new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(`${value}T00:00:00`)); }
  overdueDays(loan: Loan): number { return loan.overdue ? Math.max(1, Math.floor((Date.now() - new Date(`${loan.dueDate}T00:00:00`).getTime()) / 86400000)) : 0; }
}
