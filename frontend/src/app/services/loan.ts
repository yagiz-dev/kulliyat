import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PageResponse } from '../models/api';
import { Loan, LoanStatus } from '../models/loan';

@Injectable({ providedIn: 'root' })
export class LoanService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/loans`;
  list(status: LoanStatus = 'ALL', page = 0, size = 20, memberId?: number): Observable<PageResponse<Loan>> {
    let params = new HttpParams().set('status', status).set('page', page).set('size', size);
    if (memberId) params = params.set('memberId', memberId);
    return this.http.get<PageResponse<Loan>>(this.url, { params });
  }
  checkout(memberId: number, inventoryNumber: string): Observable<Loan> {
    return this.http.post<Loan>(`${this.url}/checkout`, { memberId, inventoryNumber });
  }
  returnBook(inventoryNumber: string): Observable<Loan> {
    return this.http.post<Loan>(`${this.url}/return`, { inventoryNumber });
  }
}
