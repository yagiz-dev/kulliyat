import { Component, afterNextRender, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { apiErrorMessage } from '../../interceptors/api-error';
import { Member } from '../../models/member';
import { MemberService } from '../../services/member';
import { MemberDetailComponent } from '../member-detail/member-detail';
import { MemberFormComponent } from '../member-form/member-form';
import { ExpandableSearchComponent } from '../expandable-search/expandable-search';
import { FilterMenuComponent } from '../filter-menu/filter-menu';
import { SortMenuComponent, SortOption } from '../sort-menu/sort-menu';

@Component({ selector: 'app-members', standalone: true, imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatIcon, MatInputModule, MatPaginatorModule, MatSelectModule, ExpandableSearchComponent, FilterMenuComponent, SortMenuComponent, MemberDetailComponent, MemberFormComponent], templateUrl: './members.html', styleUrl: './members.css' })
export class MembersComponent {
  private readonly memberService = inject(MemberService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly members = signal<Member[]>([]);
  readonly totalMembers = signal(0);
  readonly searchTerm = signal('');
  readonly joinedFrom = signal('');
  readonly joinedTo = signal('');
  readonly loanState = signal('');
  readonly sortBy = signal('lastName,asc');
  readonly sortOptions: SortOption[] = [
    { value: 'lastName,asc', label: 'Soyadı (A–Z)' }, { value: 'lastName,desc', label: 'Soyadı (Z–A)' },
    { value: 'joinedAt,desc', label: 'En yeni kayıtlar' }, { value: 'joinedAt,asc', label: 'En eski kayıtlar' },
    { value: 'id,desc', label: 'Üye no. (azalan)' },
  ];
  readonly activeFilterCount = computed(() => [this.joinedFrom(), this.joinedTo(), this.loanState()].filter(Boolean).length);
  readonly loading = signal(true);
  readonly error = signal('');
  readonly selectedMember = signal<Member | null>(null);
  readonly editingMember = signal<Member | null>(null);
  readonly formOpen = signal(false);
  readonly savedMember = signal<Member | null>(null);
  pageSize = 20;
  currentPage = 0;

  constructor() {
    const query = this.route.snapshot.queryParamMap;
    this.joinedFrom.set(query.get('joinedFrom') || '');
    this.joinedTo.set(query.get('joinedTo') || '');
    this.loanState.set(query.get('loanState') || '');
    this.sortBy.set(query.get('sort') || 'lastName,asc');
    afterNextRender(() => {
      this.loadMembers();
      if (this.route.snapshot.queryParamMap.get('create') === 'true') this.openCreate();
    });
  }

  loadMembers(): void {
    this.loading.set(true); this.error.set('');
    const [sortBy, sortDirection] = this.sortBy().split(',');
    this.memberService.list(this.searchTerm().trim(), this.currentPage, this.pageSize, this.joinedFrom(), this.joinedTo(), this.loanState(), sortBy, sortDirection).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (response) => { this.members.set(response.content); this.totalMembers.set(response.totalElements); },
      error: (error) => this.error.set(apiErrorMessage(error)),
    });
  }
  search(): void { this.currentPage = 0; this.loadMembers(); }
  clearSearch(): void { this.searchTerm.set(''); this.search(); }
  applyFilters(): void { this.currentPage = 0; this.syncFilterUrl(); this.loadMembers(); }
  clearFilters(): void { this.joinedFrom.set(''); this.joinedTo.set(''); this.loanState.set(''); this.applyFilters(); }
  changeSort(value: string): void { this.sortBy.set(value); this.currentPage = 0; void this.router.navigate([], { relativeTo: this.route, queryParamsHandling: 'merge', queryParams: { sort: value === 'lastName,asc' ? null : value } }); this.loadMembers(); }
  private syncFilterUrl(): void { void this.router.navigate([], { relativeTo: this.route, queryParamsHandling: 'merge', queryParams: { joinedFrom: this.joinedFrom() || null, joinedTo: this.joinedTo() || null, loanState: this.loanState() || null } }); }
  onPageChange(event: PageEvent): void { this.currentPage = event.pageIndex; this.pageSize = event.pageSize; this.loadMembers(); }
  initials(member: Member): string { return `${member.firstName.charAt(0)}${member.lastName.charAt(0)}`.toLocaleUpperCase('tr-TR'); }
  joinedDate(member: Member): string { return new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(member.joinedAt)); }
  openCreate(): void { this.editingMember.set(null); this.formOpen.set(true); }
  openEdit(member: Member): void { this.selectedMember.set(null); this.editingMember.set(member); this.formOpen.set(true); }
  memberSaved(member: Member): void { this.formOpen.set(false); this.editingMember.set(null); this.savedMember.set(member); this.loadMembers(); }
}
