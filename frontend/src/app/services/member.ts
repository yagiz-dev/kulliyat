import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PageResponse } from '../models/api';
import { Member, MemberRequest } from '../models/member';

@Injectable({ providedIn: 'root' })
export class MemberService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/members`;
  list(search = '', page = 0, size = 20): Observable<PageResponse<Member>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (search) params = params.set('search', search);
    return this.http.get<PageResponse<Member>>(this.url, { params });
  }
  get(id: number): Observable<Member> { return this.http.get<Member>(`${this.url}/${id}`); }
  create(request: MemberRequest): Observable<Member> { return this.http.post<Member>(this.url, request); }
  update(id: number, request: MemberRequest): Observable<Member> { return this.http.put<Member>(`${this.url}/${id}`, request); }
}
