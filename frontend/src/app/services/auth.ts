import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginResponse, Staff } from '../models/staff';

export interface LoginRequest { username: string; password: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenKey = 'kulliyat_jwt';
  private readonly staffKey = 'kulliyat_staff';
  readonly currentStaff = signal<Staff | null>(this.readStaff());

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      tap(({ token, staff }) => this.persistSession(token, staff)),
    );
  }

  refreshCurrentStaff(): Observable<Staff> {
    return this.http.get<Staff>(`${environment.apiUrl}/staff/me`).pipe(tap((staff) => this.persistStaff(staff)));
  }

  getToken(): string | null { return localStorage.getItem(this.tokenKey); }
  isLoggedIn(): boolean { return Boolean(this.getToken()); }
  hasRole(role: Staff['role']): boolean { return this.currentStaff()?.role === role; }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.staffKey);
    this.currentStaff.set(null);
  }

  private persistSession(token: string, staff: Staff): void {
    localStorage.setItem(this.tokenKey, token);
    this.persistStaff(staff);
  }

  private persistStaff(staff: Staff): void {
    localStorage.setItem(this.staffKey, JSON.stringify(staff));
    this.currentStaff.set(staff);
  }

  private readStaff(): Staff | null {
    const value = localStorage.getItem(this.staffKey);
    if (!value) return null;
    try { return JSON.parse(value) as Staff; } catch { return null; }
  }
}
