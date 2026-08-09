import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  readonly isSubmitting = signal(false);
  readonly loginForm = this.fb.nonNullable.group({ username: ['', Validators.required], password: ['', Validators.required] });
  errorMessage = '';

  onSubmit(): void {
    if (this.loginForm.invalid || this.isSubmitting()) return;
    this.errorMessage = '';
    this.isSubmitting.set(true);
    this.authService.login(this.loginForm.getRawValue()).pipe(
      finalize(() => this.isSubmitting.set(false)),
    ).subscribe({
      next: () => void this.router.navigate(['/']),
      error: () => { this.errorMessage = 'Kullanıcı adı ya da şifre geçersiz.'; },
    });
  }
}
