import { Component, ElementRef, EventEmitter, HostListener, Input, Output, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

export interface SortOption { value: string; label: string; }

@Component({ selector: 'app-sort-menu', standalone: true, imports: [MatButtonModule, MatIcon], templateUrl: './sort-menu.html', styleUrl: './sort-menu.css' })
export class SortMenuComponent {
  private readonly host = inject(ElementRef<HTMLElement>);
  @Input({ required: true }) options: SortOption[] = [];
  @Input({ required: true }) value = '';
  @Output() valueChange = new EventEmitter<string>();
  readonly open = signal(false);

  select(value: string): void { this.valueChange.emit(value); this.open.set(false); }
  @HostListener('document:click', ['$event']) closeOutside(event: MouseEvent): void {
    if (this.open() && !this.host.nativeElement.contains(event.target as Node)) this.open.set(false);
  }
  @HostListener('document:keydown.escape') closeWithEscape(): void { this.open.set(false); }
}
