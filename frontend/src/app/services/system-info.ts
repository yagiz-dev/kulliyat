import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SystemInfo } from '../models/system-info';

@Injectable({ providedIn: 'root' })
export class SystemInfoService {
  private readonly http = inject(HttpClient);

  getInfo(): Observable<SystemInfo> {
    return this.http.get<SystemInfo>(`${environment.apiUrl}/system/info`);
  }
}
