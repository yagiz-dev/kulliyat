export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface ApiError {
  status: number;
  message: string;
  timestamp: string;
}

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';
export interface RequestState<T> { status: RequestStatus; data: T | null; error: string | null; }
export const initialRequestState = <T>(): RequestState<T> => ({ status: 'idle', data: null, error: null });
