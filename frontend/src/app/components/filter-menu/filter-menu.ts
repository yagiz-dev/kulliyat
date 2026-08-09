import { Component, ElementRef, EventEmitter, HostListener, Input, Output, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({ selector: 'app-filter-menu', standalone: true, imports: [MatButtonModule, MatIcon], templateUrl: './filter-menu.html', styleUrl: './filter-menu.css' })
export class FilterMenuComponent {
  private readonly host = inject(ElementRef<HTMLElement>);
  @Input() activeCount = 0;
  @Output() apply = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();
  readonly open = signal(false);

  toggle(): void { this.open.update((value) => !value); }
  applyFilters(): void { this.apply.emit(); this.open.set(false); }
  clearFilters(): void { this.clear.emit(); this.open.set(false); }
  @HostListener('document:click', ['$event']) closeOutside(event: MouseEvent): void {
    if (this.open() && !this.host.nativeElement.contains(event.target as Node)) this.open.set(false);
  }
  @HostListener('document:keydown.escape') closeWithEscape(): void { this.open.set(false); }
}
