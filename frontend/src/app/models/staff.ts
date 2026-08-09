export type StaffRole = 'ROLE_LIBRARIAN' | 'ROLE_ADMIN';
export interface Staff { id: number; username: string; firstName: string | null; lastName: string | null; role: StaffRole; }
export interface LoginResponse { token: string; staff: Staff; }
