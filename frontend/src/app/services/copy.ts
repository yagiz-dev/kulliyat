import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PageResponse } from '../models/api';
import { BookCopy, CopyStatus, UpdateCopyRequest } from '../models/copy';

@Injectable({ providedIn: 'root' })
export class CopyService {
  private readonly http = inject(HttpClient);
  list(search = '', status?: CopyStatus, page = 0, size = 20, location = '', bookId?: number, sortBy = 'inventoryNumber', sortDirection = 'asc'): Observable<PageResponse<BookCopy>> {
    let params = new HttpParams().set('page', page).set('size', size).set('sortBy', sortBy).set('sortDirection', sortDirection);
    if (search) params = params.set('search', search);
    if (status) params = params.set('status', status);
    if (location) params = params.set('location', location);
    if (bookId) params = params.set('bookId', bookId);
    return this.http.get<PageResponse<BookCopy>>(`${environment.apiUrl}/copies`, { params });
  }
  get(id: number): Observable<BookCopy> { return this.http.get<BookCopy>(`${environment.apiUrl}/copies/${id}`); }
  add(bookId: number, physicalLocation: string): Observable<BookCopy> {
    return this.http.post<BookCopy>(`${environment.apiUrl}/books/${bookId}/copies`, { physicalLocation });
  }
  update(id: number, request: UpdateCopyRequest): Observable<BookCopy> {
    return this.http.patch<BookCopy>(`${environment.apiUrl}/copies/${id}`, request);
  }
}
