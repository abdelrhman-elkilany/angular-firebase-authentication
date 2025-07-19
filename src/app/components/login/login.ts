import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule,
    MatButtonModule,
    MatFormField,
    MatLabel,
    MatButton,
    MatError,
    MatInput,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardActions,
    MatCardContent,
    MatCardSubtitle],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  authService = inject(AuthService);
  router = inject(Router);
  errorMessage?: string;
  user: any;
  activatedRoute = inject(ActivatedRoute);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.authService.user.pipe(take(1)).subscribe((user) => {
      if (user?.getIdToken) {
        this.router.navigate(['/todo']);
      }
    });

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['message'] === 'login_required') {
        this.errorMessage = 'You need to log in first to access to do.';
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.performLogin();
    } else {
      this.handleInvalidForm();
    }
  }
  
  private performLogin(): void {
    const email = this.loginForm.value.email as string;
    const password = this.loginForm.value.password as string;
  
    this.authService.login(email, password).subscribe({
      next: () => this.handleSuccessfulLogin(),
      error: (error) => this.handleLoginError(error),
    });
  }
  
  private handleSuccessfulLogin(): void {
    this.router.navigate(['/todo']);
    this.loginForm.reset();
  }
  
  private handleLoginError(error: any): void {
    this.errorMessage =
      error.error?.error?.message === 'INVALID_LOGIN_CREDENTIALS'
        ? 'Invalid email or password'
        : 'Login failed';
    this.loginForm.reset();
  }
  
  private handleInvalidForm(): void {
    console.log('Invalid Form');
    this.loginForm.markAllAsTouched();
  }
}
