import { Routes } from '@angular/router';
import { adminGuard, authGuard } from './guards/auth';

const placeholder = () => import('./components/placeholder/placeholder').then((m) => m.PlaceholderComponent);

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./components/login/login').then((m) => m.LoginComponent) },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./components/shell/shell').then((m) => m.ShellComponent),
    children: [
      { path: '', pathMatch: 'full', data: { title: 'Ana sayfa' }, loadComponent: () => import('./components/overview/overview').then((m) => m.OverviewComponent) },
      { path: 'circulation/checkout', data: { title: 'Ödünç ver' }, loadComponent: () => import('./components/checkout/checkout').then((m) => m.CheckoutComponent) },
      { path: 'circulation/return', data: { title: 'İade al' }, loadComponent: () => import('./components/return/return').then((m) => m.ReturnComponent) },
      { path: 'circulation/loans', data: { title: 'Ödünç işlemleri' }, loadComponent: () => import('./components/loans/loans').then((m) => m.LoansComponent) },
      { path: 'catalog/books', data: { title: 'Kitaplar' }, loadComponent: () => import('./components/books/books').then((m) => m.BooksComponent) },
      { path: 'catalog/copies', data: { title: 'Nüshalar' }, loadComponent: () => import('./components/inventory/inventory').then((m) => m.InventoryComponent) },
      { path: 'catalog/authors', data: { title: 'Yazarlar', authorityType: 'authors' }, loadComponent: () => import('./components/catalog-authority/catalog-authority').then((m) => m.CatalogAuthorityComponent) },
      { path: 'catalog/publishers', data: { title: 'Yayınevleri', authorityType: 'publishers' }, loadComponent: () => import('./components/catalog-authority/catalog-authority').then((m) => m.CatalogAuthorityComponent) },
      { path: 'members', data: { title: 'Üyeler' }, loadComponent: () => import('./components/members/members').then((m) => m.MembersComponent) },
      { path: 'reports', data: { title: 'Raporlar' }, loadComponent: placeholder },
      { path: 'administration/staff', canActivate: [adminGuard], data: { title: 'Yöneticiler' }, loadComponent: placeholder },
      { path: 'administration/settings', canActivate: [adminGuard], data: { title: 'Sistem ve ortam' }, loadComponent: () => import('./components/settings/settings').then((m) => m.SettingsComponent) },
    ],
  },
  { path: '**', redirectTo: '' },
];
