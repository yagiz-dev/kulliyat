import { Loan } from './loan';

export interface DashboardSummary {
  totalBooks: number;
  totalCopies: number;
  availableCopies: number;
  loanedCopies: number;
  maintenanceCopies: number;
  lostCopies: number;
  totalMembers: number;
  activeLoans: number;
  overdueLoans: number;
  recentLoans: Loan[];
}
