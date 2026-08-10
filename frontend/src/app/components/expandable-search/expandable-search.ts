import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-expandable-search',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatIcon, MatInputModule],
  templateUrl: './expandable-search.html',
  styleUrl: './expandable-search.css',
  host: { '[class.expanded]': 'expanded()' },
})
export class ExpandableSearchComponent implements OnChanges {
  @Input() query = '';
  @Input() placeholder = 'Ara';
  @Input() prefixIcon = '';
  @Input() disabled = false;
  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  readonly expanded = signal(false);
  draft = '';

  resolvedPrefixIcon(): string {
    return this.prefixIcon || (this.placeholder.toLocaleLowerCase('tr-TR').includes('envanter numarası') ? 'qr_code_scanner' : '');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['query']) {
      this.draft = this.query;
      if (this.query.trim()) this.expanded.set(true);
    }
  }

  open(): void {
    if (this.disabled) return;
    this.expanded.set(true);
    setTimeout(() => this.searchInput?.nativeElement.focus());
  }

  submit(): void {
    const query = this.draft.trim();
    if (!query || this.disabled) return;
    this.search.emit(query);
  }

  close(): void {
    const hadActiveQuery = Boolean(this.query.trim());
    this.draft = '';
    this.expanded.set(false);
    if (hadActiveQuery) this.clear.emit();
  }
}
