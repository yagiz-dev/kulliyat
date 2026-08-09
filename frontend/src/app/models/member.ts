export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  joinedAt: string;
  activeLoanCount: number;
  overdueLoanCount: number;
  totalLoanCount: number;
}
export type MemberRequest = Pick<Member, 'firstName' | 'lastName' | 'email' | 'phoneNumber'>;
