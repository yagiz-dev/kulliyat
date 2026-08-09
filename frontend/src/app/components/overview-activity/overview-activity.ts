import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Loan } from '../../models/loan';

@Component({ selector: 'app-overview-activity', standalone: true, imports: [MatButtonModule, MatIcon, RouterLink], templateUrl: './overview-activity.html', styleUrl: './overview-activity.css' })
export class OverviewActivityComponent {
  @Input({ required: true }) loans: Loan[] = [];
  formatDate(value: string | null): string { return value ? new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${value}T00:00:00`)) : '—'; }
  loanState(loan: Loan): string { return loan.returnDate ? 'İade edildi' : loan.overdue ? 'Gecikmiş' : 'Ödünç aldı'; }
  stateClass(loan: Loan): string { return loan.returnDate ? 'returned' : loan.overdue ? 'overdue' : 'active'; }
}
