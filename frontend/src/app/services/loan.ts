import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PageResponse } from '../models/api';
import { Loan, LoanStatus } from '../models/loan';

export interface LoanFilters {
  search?: string;
  bookId?: number;
  copyId?: number;
  checkoutFrom?: string;
  checkoutTo?: string;
  dueFrom?: string;
  dueTo?: string;
  issuedBy?: string;
  overdueRange?: string;
}

@Injectable({ providedIn: 'root' })
export class LoanService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/loans`;
  list(status: LoanStatus = 'ALL', page = 0, size = 20, memberId?: number, filters: LoanFilters = {}, sort = 'checkoutDate,desc'): Observable<PageResponse<Loan>> {
    let params = new HttpParams().set('status', status).set('page', page).set('size', size);
    if (memberId) params = params.set('memberId', memberId);
    if (filters.search) params = params.set('search', filters.search);
    if (filters.bookId) params = params.set('bookId', filters.bookId);
    if (filters.copyId) params = params.set('copyId', filters.copyId);
    if (filters.checkoutFrom) params = params.set('checkoutFrom', filters.checkoutFrom);
    if (filters.checkoutTo) params = params.set('checkoutTo', filters.checkoutTo);
    if (filters.dueFrom) params = params.set('dueFrom', filters.dueFrom);
    if (filters.dueTo) params = params.set('dueTo', filters.dueTo);
    if (filters.issuedBy) params = params.set('issuedBy', filters.issuedBy);
    if (filters.overdueRange) params = params.set('overdueRange', filters.overdueRange);
    const [sortBy, sortDirection] = sort.split(',');
    params = params.set('sortBy', sortBy).set('sortDirection', sortDirection || 'asc');
    return this.http.get<PageResponse<Loan>>(this.url, { params });
  }
  checkout(memberId: number, inventoryNumber: string): Observable<Loan> {
    return this.http.post<Loan>(`${this.url}/checkout`, { memberId, inventoryNumber });
  }
  returnBook(inventoryNumber: string): Observable<Loan> {
    return this.http.post<Loan>(`${this.url}/return`, { inventoryNumber });
  }
}
