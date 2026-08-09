import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PageResponse } from '../models/api';
import { Author, Book, BookRequest, Genre, Publisher } from '../models/book';

export interface BookFilters { genre?: Genre; authorId?: number; publisherId?: number; yearFrom?: number; yearTo?: number; }

@Injectable({ providedIn: 'root' })
export class BookService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/books`;

  getBooks(search = '', page = 0, size = 10, sortBy = 'title', filters: BookFilters = {}, sortDirection = 'asc'): Observable<PageResponse<Book>> {
    let params = new HttpParams().set('page', page).set('size', size).set('sortBy', sortBy).set('sortDirection', sortDirection);
    if (search) params = params.set('search', search);
    if (filters.genre) params = params.set('genre', filters.genre);
    if (filters.authorId) params = params.set('authorId', filters.authorId);
    if (filters.publisherId) params = params.set('publisherId', filters.publisherId);
    if (filters.yearFrom) params = params.set('yearFrom', filters.yearFrom);
    if (filters.yearTo) params = params.set('yearTo', filters.yearTo);
    return this.http.get<PageResponse<Book>>(this.url, { params });
  }

  getBook(id: number): Observable<Book> { return this.http.get<Book>(`${this.url}/${id}`); }
  createBook(request: BookRequest): Observable<Book> { return this.http.post<Book>(this.url, request); }
  updateBook(id: number, request: BookRequest): Observable<Book> { return this.http.put<Book>(`${this.url}/${id}`, request); }
  deleteBook(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
  getAuthors(): Observable<Author[]> { return this.http.get<Author[]>(`${environment.apiUrl}/authors`); }
  getPublishers(): Observable<Publisher[]> { return this.http.get<Publisher[]>(`${environment.apiUrl}/publishers`); }
  createAuthor(name: string): Observable<Author> { return this.http.post<Author>(`${environment.apiUrl}/authors`, { name }); }
  updateAuthor(id: number, name: string): Observable<Author> { return this.http.put<Author>(`${environment.apiUrl}/authors/${id}`, { name }); }
  deleteAuthor(id: number): Observable<void> { return this.http.delete<void>(`${environment.apiUrl}/authors/${id}`); }
  createPublisher(name: string): Observable<Publisher> { return this.http.post<Publisher>(`${environment.apiUrl}/publishers`, { name }); }
  updatePublisher(id: number, name: string): Observable<Publisher> { return this.http.put<Publisher>(`${environment.apiUrl}/publishers/${id}`, { name }); }
  deletePublisher(id: number): Observable<void> { return this.http.delete<void>(`${environment.apiUrl}/publishers/${id}`); }
}
