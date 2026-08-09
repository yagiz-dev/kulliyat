import { Component, afterNextRender, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { apiErrorMessage } from '../../interceptors/api-error';
import { Loan, LoanStatus } from '../../models/loan';
import { LoanService } from '../../services/loan';

@Component({ selector: 'app-loans', standalone: true, imports: [MatButtonModule, MatIcon, MatPaginatorModule, RouterLink], templateUrl: './loans.html', styleUrl: './loans.css' })
export class LoansComponent {
  private readonly loanService = inject(LoanService);
  private readonly route = inject(ActivatedRoute);
  readonly loans = signal<Loan[]>([]);
  readonly totalLoans = signal(0);
  readonly status = signal<LoanStatus>('ACTIVE');
  readonly loading = signal(true);
  readonly error = signal('');
  pageSize = 20; currentPage = 0;
  readonly filters: { value: LoanStatus; label: string; icon: string }[] = [{ value: 'ACTIVE', label: 'Aktif', icon: 'schedule' }, { value: 'OVERDUE', label: 'Geciken', icon: 'warning' }, { value: 'ALL', label: 'Tüm işlemler', icon: 'receipt_long' }];
  constructor() { afterNextRender(() => { const requested = this.route.snapshot.queryParamMap.get('status') as LoanStatus | null; if (requested && ['ALL', 'ACTIVE', 'OVERDUE'].includes(requested)) this.status.set(requested); this.loadLoans(); }); }
  loadLoans(): void { this.loading.set(true); this.error.set(''); this.loanService.list(this.status(), this.currentPage, this.pageSize).pipe(finalize(() => this.loading.set(false))).subscribe({ next: (response) => { this.loans.set(response.content); this.totalLoans.set(response.totalElements); }, error: (error) => this.error.set(apiErrorMessage(error)) }); }
  changeStatus(status: LoanStatus): void { this.status.set(status); this.currentPage = 0; this.loadLoans(); }
  onPageChange(event: PageEvent): void { this.currentPage = event.pageIndex; this.pageSize = event.pageSize; this.loadLoans(); }
  formatDate(value: string | null): string { return value ? new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${value}T00:00:00`)) : '—'; }
  loanState(loan: Loan): string { return loan.returnDate ? 'İade edildi' : loan.overdue ? 'Gecikmiş' : 'Aktif'; }
  stateClass(loan: Loan): string { return loan.returnDate ? 'returned' : loan.overdue ? 'overdue' : 'active'; }
}
