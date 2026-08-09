import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { apiErrorMessage } from '../../interceptors/api-error';
import { Author, Publisher } from '../../models/book';
import { BookService } from '../../services/book';
import { ExpandableSearchComponent } from '../expandable-search/expandable-search';

type AuthorityRecord = Author | Publisher;
type AuthorityType = 'authors' | 'publishers';

@Component({
  selector: 'app-catalog-authority',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ExpandableSearchComponent, MatButtonModule, MatFormFieldModule, MatIcon, MatInputModule],
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
  readonly error = signal('');
  readonly form = this.fb.nonNullable.group({ name: ['', [Validators.required, Validators.maxLength(255)]] });
  readonly filteredRecords = computed(() => {
    const query = this.search().trim().toLocaleLowerCase('tr-TR');
    return this.records().filter((record) => !query || record.name.toLocaleLowerCase('tr-TR').includes(query));
  });

  get title(): string { return this.type === 'authors' ? 'Yazarlar' : 'Yayınevleri'; }
  get singular(): string { return this.type === 'authors' ? 'yazar' : 'yayınevi'; }
  get icon(): string { return this.type === 'authors' ? 'person' : 'business'; }

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    this.error.set('');
    const request = this.type === 'authors' ? this.service.getAuthors() : this.service.getPublishers();
    request.pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (records) => this.records.set([...records].sort((a, b) => a.name.localeCompare(b.name, 'tr'))),
      error: (error) => this.error.set(apiErrorMessage(error)),
    });
  }

  startCreate(): void { this.editing.set(null); this.form.reset({ name: '' }); }
  startEdit(record: AuthorityRecord): void { this.editing.set(record); this.form.reset({ name: record.name }); }
  cancelEdit(): void { this.editing.set(null); this.form.reset({ name: '' }); }

  save(): void {
    if (this.form.invalid || this.saving()) { this.form.markAllAsTouched(); return; }
    const name = this.form.controls.name.value.trim();
    const record = this.editing();
    const request = this.type === 'authors'
      ? (record ? this.service.updateAuthor(record.id, name) : this.service.createAuthor(name))
      : (record ? this.service.updatePublisher(record.id, name) : this.service.createPublisher(name));
    this.saving.set(true);
    this.error.set('');
    request.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: () => { this.cancelEdit(); this.load(); },
      error: (error) => this.error.set(apiErrorMessage(error)),
    });
  }

  remove(record: AuthorityRecord): void {
    if (!confirm(`“${record.name}” kaydını silmek istediğinizden emin misiniz?`)) return;
    const request = this.type === 'authors' ? this.service.deleteAuthor(record.id) : this.service.deletePublisher(record.id);
    request.subscribe({
      next: () => this.records.update((records) => records.filter((item) => item.id !== record.id)),
      error: (error) => this.error.set(apiErrorMessage(error)),
    });
  }
}
