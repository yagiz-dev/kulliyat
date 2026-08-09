import { BookSummary } from './book';
export type CopyStatus = 'AVAILABLE' | 'LOANED' | 'MAINTENANCE' | 'LOST';
export interface BookCopy { id: number; inventoryNumber: string; physicalLocation: string | null; status: CopyStatus; book: BookSummary; }
export interface UpdateCopyRequest { physicalLocation?: string; status?: CopyStatus; }
