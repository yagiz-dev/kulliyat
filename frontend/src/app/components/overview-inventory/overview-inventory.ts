import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { DashboardSummary } from '../../models/dashboard';

@Component({ selector: 'app-overview-inventory', standalone: true, imports: [MatButtonModule, RouterLink], templateUrl: './overview-inventory.html', styleUrl: './overview-inventory.css' })
export class OverviewInventoryComponent {
  @Input({ required: true }) summary!: DashboardSummary;
  percent(value: number): number { return this.summary.totalCopies ? Math.round((value / this.summary.totalCopies) * 100) : 0; }
}
