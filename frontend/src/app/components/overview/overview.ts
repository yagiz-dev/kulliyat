import { Component, afterNextRender, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { apiErrorMessage } from '../../interceptors/api-error';
import { DashboardSummary } from '../../models/dashboard';
import { DashboardService } from '../../services/dashboard';
import { OverviewActivityComponent } from '../overview-activity/overview-activity';
import { OverviewInventoryComponent } from '../overview-inventory/overview-inventory';

@Component({ selector: 'app-overview', standalone: true, imports: [MatButtonModule, MatIcon, OverviewActivityComponent, OverviewInventoryComponent, RouterLink], templateUrl: './overview.html', styleUrl: './overview.css' })
export class OverviewComponent {
  private readonly dashboardService = inject(DashboardService);
  readonly summary = signal<DashboardSummary | null>(null);
  readonly loading = signal(true);
  readonly error = signal('');
  readonly refreshedAt = signal<Date | null>(null);
  constructor() { afterNextRender(() => this.loadSummary()); }
  loadSummary(): void { this.loading.set(true); this.error.set(''); this.dashboardService.getSummary().pipe(finalize(() => this.loading.set(false))).subscribe({ next: (summary) => { this.summary.set(summary); this.refreshedAt.set(new Date()); }, error: (error) => this.error.set(apiErrorMessage(error)) }); }
}
