import { Component, afterNextRender, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize, map, of, switchMap } from 'rxjs';
import { apiErrorMessage } from '../../interceptors/api-error';
import { BookCopy } from '../../models/copy';
import { Loan } from '../../models/loan';
import { CopyService } from '../../services/copy';
import { LoanService } from '../../services/loan';

@Component({ selector: 'app-return', standalone: true, imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatIcon, MatInputModule, RouterLink], templateUrl: './return.html', styleUrl: './return.css' })
export class ReturnComponent {
  private readonly copyService = inject(CopyService);
  private readonly loanService = inject(LoanService);
  private readonly route = inject(ActivatedRoute);
  readonly inventoryNumber = signal('');
  readonly selectedCopy = signal<BookCopy | null>(null);
  readonly selectedLoan = signal<Loan | null>(null);
  readonly checking = signal(false);
  readonly submitting = signal(false);
  readonly error = signal('');
  readonly completedLoan = signal<Loan | null>(null);

  constructor() {
    afterNextRender(() => {
      const inventoryNumber = this.route.snapshot.queryParamMap.get('inventoryNumber')?.trim();
      if (inventoryNumber) { this.inventoryNumber.set(inventoryNumber); this.lookupCopy(); }
    });
  }

  lookupCopy(): void {
    const inventory = this.inventoryNumber().trim(); if (!inventory) return;
    this.checking.set(true); this.selectedCopy.set(null); this.selectedLoan.set(null); this.error.set('');
    this.copyService.list(inventory, undefined, 0, 10).pipe(
      switchMap((response) => {
        const copy = response.content.find((item) => item.inventoryNumber.toUpperCase() === inventory.toUpperCase()) ?? null;
        if (!copy || copy.status !== 'LOANED') return of({ copy, loan: null });
        return this.loanService.list('ACTIVE', 0, 1000).pipe(
          map((loans) => ({ copy, loan: loans.content.find((loan) => loan.bookCopy.id === copy.id) ?? null })),
        );
      }),
      finalize(() => this.checking.set(false)),
    ).subscribe({
      next: ({ copy, loan }) => {
        this.selectedCopy.set(copy);
        this.selectedLoan.set(loan);
        if (!copy) this.error.set('Bu envanter numarasıyla eşleşen bir nüsha bulunamadı.');
        else if (copy.status === 'LOANED' && !loan) this.error.set('Nüshaya ait aktif ödünç kaydı bulunamadı.');
      },
      error: (error) => this.error.set(apiErrorMessage(error)),
    });
  }
  returnBook(): void {
    const copy = this.selectedCopy(); if (!copy || copy.status !== 'LOANED' || !this.selectedLoan() || this.submitting()) return;
    this.submitting.set(true); this.error.set('');
    this.loanService.returnBook(copy.inventoryNumber).pipe(finalize(() => this.submitting.set(false))).subscribe({ next: (loan) => this.completedLoan.set(loan), error: (error) => this.error.set(apiErrorMessage(error)) });
  }
  reset(): void { this.inventoryNumber.set(''); this.selectedCopy.set(null); this.selectedLoan.set(null); this.completedLoan.set(null); this.error.set(''); }
  coverUrl(copy: BookCopy): string | null { return copy.book.coverImageUrl?.trim() || null; }
  formatDate(value: string): string { return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${value}T00:00:00`)); }
}
