import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth';

interface NavigationItem {
  label: string;
  icon: string;
  route?: string;
  adminOnly?: boolean;
  children?: NavigationItem[];
}

interface NavigationGroup {
  label: string;
  items: NavigationItem[];
}

@Component({
  selector: 'app-shell',
  imports: [CommonModule, MatIcon, MatMenu, MatMenuItem, MatMenuTrigger, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class ShellComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly staff = this.auth.currentStaff;
  readonly isAdmin = computed(() => this.staff()?.role === 'ROLE_ADMIN');
  readonly staffName = computed(() => {
    const staff = this.staff();
    if (!staff) return 'Kütüphane personeli';
    return [staff.firstName, staff.lastName].filter(Boolean).join(' ') || staff.username;
  });
  readonly staffInitials = computed(() => {
    const staff = this.staff();
    if (!staff) return 'K';
    const initials = [staff.firstName, staff.lastName]
      .filter((name): name is string => Boolean(name))
      .map((name) => name.trim().charAt(0))
      .join('');
    return (initials || staff.username.charAt(0)).toLocaleUpperCase('tr-TR');
  });
  readonly accountOpen = signal(false);

  readonly navigation: NavigationGroup[] = [
    {
      label: 'Ana sayfa',
      items: [{ label: 'Ana sayfa', route: '/', icon: 'dashboard' }],
    },
    {
      label: 'Ödünç işlemleri',
      items: [
        { label: 'Ödünç ver', route: '/circulation/checkout', icon: 'arrow_outward' },
        { label: 'İade al', route: '/circulation/return', icon: 'arrow_downward' },
        { label: 'Aktif işlemler', route: '/circulation/loans', icon: 'schedule' },
      ],
    },
    {
      label: 'Katalog',
      items: [
        {
          label: 'Kitaplar',
          icon: 'menu_book',
          children: [
            { label: 'Tüm kitaplar', route: '/catalog/books', icon: 'menu_book' },
            { label: 'Yazarlar', route: '/catalog/authors', icon: 'person' },
            { label: 'Yayınevleri', route: '/catalog/publishers', icon: 'business' },
          ],
        },
        { label: 'Nüshalar', route: '/catalog/copies', icon: 'inventory_2' },
      ],
    },
    {
      label: 'Üyeler',
      items: [{ label: 'Üyeler', route: '/members', icon: 'people' }],
    },
    {
      label: 'Raporlar',
      items: [{ label: 'Raporlar', route: '/reports', icon: 'bar_chart' }],
    },
    {
      label: 'Yönetim',
      items: [
        { label: 'Yöneticiler', route: '/administration/staff', icon: 'badge', adminOnly: true },
        { label: 'Ayarlar', route: '/administration/settings', icon: 'settings', adminOnly: true },
      ],
    },
  ];

  roleLabel(): string {
    return this.staff()?.role === 'ROLE_ADMIN' ? 'ICT sorumlusu' : 'Kütüphane sorumlusu';
  }

  toggleAccount(): void {
    this.accountOpen.update((open) => !open);
  }

  closeAccount(): void {
    this.accountOpen.set(false);
  }

  isNavigationItemActive(item: NavigationItem): boolean {
    return item.children?.some((child) => child.route === this.router.url) ?? false;
  }

  logout(): void {
    this.closeAccount();
    this.auth.logout();
    void this.router.navigate(['/login']);
  }
}
