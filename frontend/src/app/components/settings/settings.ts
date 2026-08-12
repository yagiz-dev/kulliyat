import { Component, afterNextRender, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { apiErrorMessage } from '../../interceptors/api-error';
import { SystemInfo } from '../../models/system-info';
import { SystemInfoService } from '../../services/system-info';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [DatePipe, MatIcon],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class SettingsComponent {
  private readonly systemInfoService = inject(SystemInfoService);

  readonly info = signal<SystemInfo | null>(null);
  readonly error = signal('');

  constructor() {
    afterNextRender(() => {
      this.systemInfoService.getInfo().subscribe({
        next: (info) => this.info.set(info),
        error: (error) => this.error.set(apiErrorMessage(error)),
      });
    });
  }

  formatUptime(totalSeconds: number): string {
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return [days ? `${days} gün` : '', hours ? `${hours} saat` : '', `${minutes} dakika`].filter(Boolean).join(' ');
  }

  environmentLabel(environment: string): string {
    return environment.toLowerCase() === 'docker'
      ? 'Docker'
      : environment.charAt(0).toLocaleUpperCase('tr-TR') + environment.slice(1);
  }

  isDocker(environment: string | undefined): boolean {
    return environment?.toLowerCase() === 'docker';
  }
}
