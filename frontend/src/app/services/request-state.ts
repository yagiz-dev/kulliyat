import { Signal, signal } from '@angular/core';
import { RequestState, initialRequestState } from '../models/api';

export interface RequestStateController<T> {
  state: Signal<RequestState<T>>;
  loading(): void;
  success(data: T): void;
  failure(error: string): void;
  reset(): void;
}

export function createRequestState<T>(): RequestStateController<T> {
  const writable = signal(initialRequestState<T>());
  return {
    state: writable.asReadonly(),
    loading: () => writable.set({ status: 'loading', data: null, error: null }),
    success: (data) => writable.set({ status: 'success', data, error: null }),
    failure: (error) => writable.set({ status: 'error', data: null, error }),
    reset: () => writable.set(initialRequestState<T>()),
  };
}
