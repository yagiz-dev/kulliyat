export interface Author { id: number; name: string; }
export interface Publisher { id: number; name: string; }
export type Genre = 'KURGU' | 'KURGU_DISI' | 'BILIMKURGU' | 'FANTASTIK' | 'GIZEM' | 'TARIH' | 'BIYOGRAFI' | 'TEKNOLOJI';

export interface Book {
  id: number;
  title: string;
  isbn: string;
  publicationYear: number | null;
  summary: string | null;
  genre: Genre;
  coverImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  publisher: Publisher | null;
  authors: Author[];
}

export interface BookSummary { id: number; title: string; isbn: string; coverImageUrl: string | null; }
export interface BookRequest {
  title: string;
  isbn: string;
  publicationYear: number | null;
  summary: string | null;
  genre: Genre;
  coverImageUrl: string | null;
  publisherId: number | null;
  authorIds: number[];
}
