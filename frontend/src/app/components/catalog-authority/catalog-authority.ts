import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { apiErrorMessage } from '../../interceptors/api-error';
import { Author, Book, Publisher } from '../../models/book';
import { BookService } from '../../services/book';
import { ExpandableSearchComponent } from '../expandable-search/expandable-search';
import { FilterMenuComponent } from '../filter-menu/filter-menu';
import { SortMenuComponent, SortOption } from '../sort-menu/sort-menu';

type AuthorityRecord = Author | Publisher;
type AuthorityType = 'authors' | 'publishers';

@Component({
  selector: 'app-catalog-authority',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ExpandableSearchComponent, FilterMenuComponent, SortMenuComponent,
    MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIcon, MatInputModule, MatMenuModule, MatSelectModule],
  templateUrl: './catalog-authority.html',
  styleUrl: './catalog-authority.css',
})
export class CatalogAuthorityComponent implements OnInit {
  private readonly service = inject(BookService);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);

  readonly type = this.route.snapshot.data['authorityType'] as AuthorityType;
  readonly records = signal<AuthorityRecord[]>([]);
  readonly search = signal('');
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly editing = signal<AuthorityRecord | null>(null);
  readonly formOpen = signal(false);
  readonly selected = signal<AuthorityRecord | null>(null);
  readonly detailBooks = signal<Book[]>([]);
  readonly loadingDetails = signal(false);
  readonly mergeSource = signal<AuthorityRecord | null>(null);
  readonly mergeTargetId = signal<number | null>(null);
  readonly unusedOnly = signal(false);
  readonly unusedDraft = signal(false);
  readonly sortBy = signal('name,asc');
  readonly error = signal('');
  readonly form = this.fb.nonNullable.group({ name: ['', [Validators.required, Validators.maxLength(255)]] });
  readonly sortOptions: SortOption[] = [
    { value: 'name,asc', label: 'Ada göre (A–Z)' }, { value: 'name,desc', label: 'Ada göre (Z–A)' },
    { value: 'bookCount,desc', label: 'En çok kitabı olan' }, { value: 'id,desc', label: 'En yeni kayıtlar' },
  ];
  readonly activeFilterCount = computed(() => this.unusedOnly() ? 1 : 0);
  readonly mergeTargets = computed(() => this.records().filter((record) => record.id !== this.mergeSource()?.id));
  readonly filteredRecords = computed(() => {
    const query = this.search().trim().toLocaleLowerCase('tr-TR');
    const [property, direction] = this.sortBy().split(',');
    return this.records()
      .filter((record) => (!query || record.name.toLocaleLowerCase('tr-TR').includes(query)) && (!this.unusedOnly() || record.bookCount === 0))
      .sort((a, b) => {
        const result = property === 'name' ? a.name.localeCompare(b.name, 'tr') : (a[property as 'id' | 'bookCount'] - b[property as 'id' | 'bookCount']);
        return direction === 'desc' ? -result : result;
      });
  });

  get title(): string { return this.type === 'authors' ? 'Yazarlar' : 'Yayınevleri'; }
  get singular(): string { return this.type === 'authors' ? 'yazar' : 'yayınevi'; }

  ngOnInit(): void { this.load(); }
  load(): void {
    this.loading.set(true); this.error.set('');
    const request = this.type === 'authors' ? this.service.getAuthors() : this.service.getPublishers();
    request.pipe(finalize(() => this.loading.set(false))).subscribe({ next: (records) => this.records.set(records), error: (error) => this.error.set(apiErrorMessage(error)) });
  }
  startCreate(): void { this.editing.set(null); this.form.reset({ name: '' }); this.formOpen.set(true); }
  startEdit(record: AuthorityRecord): void { this.editing.set(record); this.form.reset({ name: record.name }); this.formOpen.set(true); }
  closeForm(): void { this.formOpen.set(false); this.editing.set(null); this.form.reset({ name: '' }); }
  save(): void {
    if (this.form.invalid || this.saving()) { this.form.markAllAsTouched(); return; }
    const name = this.form.controls.name.value.trim(); const record = this.editing();
    const request = this.type === 'authors'
      ? (record ? this.service.updateAuthor(record.id, name) : this.service.createAuthor(name))
      : (record ? this.service.updatePublisher(record.id, name) : this.service.createPublisher(name));
    this.saving.set(true); this.error.set('');
    request.pipe(finalize(() => this.saving.set(false))).subscribe({ next: () => { this.closeForm(); this.load(); }, error: (error) => this.error.set(apiErrorMessage(error)) });
  }
  openDetails(record: AuthorityRecord): void {
    this.selected.set(record); this.detailBooks.set([]); this.loadingDetails.set(true);
    const filters = this.type === 'authors' ? { authorId: record.id } : { publisherId: record.id };
    this.service.getBooks('', 0, 8, 'title', filters).pipe(finalize(() => this.loadingDetails.set(false))).subscribe({
      next: (response) => this.detailBooks.set(response.content), error: (error) => this.error.set(apiErrorMessage(error)),
    });
  }
  startMerge(record: AuthorityRecord): void { this.mergeSource.set(record); this.mergeTargetId.set(null); }
  merge(): void {
    const source = this.mergeSource(); const targetId = this.mergeTargetId(); if (!source || !targetId || this.saving()) return;
    const request = this.type === 'authors' ? this.service.mergeAuthor(source.id, targetId) : this.service.mergePublisher(source.id, targetId);
    this.saving.set(true); this.error.set('');
    request.pipe(finalize(() => this.saving.set(false))).subscribe({ next: () => { this.mergeSource.set(null); this.mergeTargetId.set(null); this.selected.set(null); this.load(); }, error: (error) => this.error.set(apiErrorMessage(error)) });
  }
  remove(record: AuthorityRecord): void {
    if (record.bookCount > 0) { this.error.set(`Bu ${this.singular} ${record.bookCount} kitapla ilişkili. Silmek yerine birleştirme işlemini kullanın.`); return; }
    if (!confirm(`“${record.name}” kaydını silmek istediğinizden emin misiniz?`)) return;
    const request = this.type === 'authors' ? this.service.deleteAuthor(record.id) : this.service.deletePublisher(record.id);
    request.subscribe({ next: () => this.records.update((records) => records.filter((item) => item.id !== record.id)), error: (error) => this.error.set(apiErrorMessage(error)) });
  }
  applyFilters(): void { this.unusedOnly.set(this.unusedDraft()); }
  clearFilters(): void { this.unusedDraft.set(false); this.unusedOnly.set(false); }
  catalogueParams(record: AuthorityRecord): Record<string, number> { return this.type === 'authors' ? { authorId: record.id } : { publisherId: record.id }; }
  createBookParams(record: AuthorityRecord): Record<string, string | number> { return { create: 'true', ...(this.type === 'authors' ? { authorId: record.id } : { publisherId: record.id }) }; }
}
