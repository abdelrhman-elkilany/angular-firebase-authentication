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
import { MaterialModuleModule } from '../../material-module/material-module-module';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MaterialModuleModule],
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
      const email = this.loginForm.value.email as string;
      const password = this.loginForm.value.password as string;

      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/todo']);
          this.loginForm.reset();
        },
        error: (error) => {
          this.errorMessage =
            error.error?.error?.message == 'INVALID_LOGIN_CREDENTIALS'
              ? 'Invalid email or password'
              : 'Login failed';
          this.loginForm.reset();
        },
      });
    } else {
      console.log('Invalid Form');
      this.loginForm.markAllAsTouched();
    }
  }
}
