import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { finalize } from 'rxjs';
import { apiErrorMessage } from '../../interceptors/api-error';
import { Member, MemberRequest } from '../../models/member';
import { MemberService } from '../../services/member';

@Component({ selector: 'app-member-form', standalone: true, imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatIcon, MatInputModule], templateUrl: './member-form.html', styleUrl: './member-form.css' })
export class MemberFormComponent implements OnChanges {
  private readonly fb = inject(FormBuilder);
  private readonly memberService = inject(MemberService);
  @Input() member: Member | null = null;
  @Output() saved = new EventEmitter<Member>();
  @Output() cancel = new EventEmitter<void>();
  readonly submitting = signal(false);
  readonly error = signal('');
  readonly form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.maxLength(100)]],
    lastName: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: [''],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['member']) return;
    this.form.reset({ firstName: this.member?.firstName ?? '', lastName: this.member?.lastName ?? '', email: this.member?.email ?? '', phoneNumber: this.member?.phoneNumber ?? '' });
    this.error.set('');
  }

  submit(): void {
    if (this.form.invalid || this.submitting()) { this.form.markAllAsTouched(); return; }
    const value = this.form.getRawValue();
    const request: MemberRequest = { firstName: value.firstName.trim(), lastName: value.lastName.trim(), email: value.email.trim(), phoneNumber: value.phoneNumber.trim() || null };
    const operation = this.member ? this.memberService.update(this.member.id, request) : this.memberService.create(request);
    this.submitting.set(true); this.error.set('');
    operation.pipe(finalize(() => this.submitting.set(false))).subscribe({ next: (member) => this.saved.emit(member), error: (error) => this.error.set(apiErrorMessage(error)) });
  }
}
