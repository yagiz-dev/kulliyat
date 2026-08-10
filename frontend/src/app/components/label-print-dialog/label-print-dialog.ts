import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { finalize } from 'rxjs';
import { apiErrorMessage } from '../../interceptors/api-error';
import { CopyService } from '../../services/copy';

@Component({
  selector: 'app-label-print-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatIcon, MatInputModule],
  templateUrl: './label-print-dialog.html',
  styleUrl: './label-print-dialog.css',
})
export class LabelPrintDialogComponent implements OnChanges {
  private readonly copyService = inject(CopyService);

  @Input({ required: true }) copyIds: number[] = [];
  @Output() close = new EventEmitter<void>();

  readonly startPosition = new FormControl(1, { nonNullable: true, validators: [Validators.min(1), Validators.max(20)] });
  readonly generating = signal(false);
  readonly error = signal('');
  readonly cells = Array.from({ length: 20 }, (_, index) => index + 1);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['copyIds']) {
      this.startPosition.setValue(1);
      this.error.set('');
    }
  }

  pageCount(): number {
    return Math.max(1, Math.ceil((this.startPosition.value - 1 + this.copyIds.length) / 20));
  }

  cellState(position: number): 'blank' | 'label' | 'unused' {
    if (position < this.startPosition.value) return 'blank';
    return position - this.startPosition.value < this.copyIds.length ? 'label' : 'unused';
  }

  generate(): void {
    if (this.generating() || this.startPosition.invalid || !this.copyIds.length) return;
    this.generating.set(true);
    this.error.set('');
    this.copyService.generateLabels({
      copyIds: this.copyIds,
      startPosition: this.startPosition.value,
    }).pipe(finalize(() => this.generating.set(false))).subscribe({
      next: (pdf) => {
        const url = URL.createObjectURL(pdf);
        const link = document.createElement('a');
        link.href = url;
        link.download = `kulliyat-etiketleri-${new Date().toISOString().slice(0, 10)}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      },
      error: (error) => this.error.set(apiErrorMessage(error)),
    });
  }
}
