export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  joinedAt: string;
}
export type MemberRequest = Pick<Member, 'firstName' | 'lastName' | 'email' | 'phoneNumber'>;
