import { BookCopy } from './copy';
import { Member } from './member';
export type LoanStatus = 'ALL' | 'ACTIVE' | 'OVERDUE';
export interface Loan {
  id: number;
  bookCopy: BookCopy;
  member: Member;
  checkoutDate: string;
  dueDate: string;
  returnDate: string | null;
  issuedBy: string;
  overdue: boolean;
}
