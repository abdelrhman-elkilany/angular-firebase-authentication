import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, take, tap } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user = new BehaviorSubject<User | null>(null);

  httpClient = inject(HttpClient);

  router = inject(Router);

  refreshUser() {
    const userData = localStorage.getItem('userData');
    const user = userData ? JSON.parse(userData) : null;
    if (user && new Date() <= new Date(user.expiresIn)) {
      this.user.next(
        new User(
          user.email,
          user.password,
          user.localId,
          user.idToken,
          user.expiresIn
        )
      );
    } else {
      this.user.next(null);
      user ?? localStorage.removeItem('userData');
    }
  }

  login(email: string, password: string) {
    return this.httpClient
      .post(
          environment.firebase_auth_url +
          environment.apiToken,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        take(1),
        tap((response: any) => {
          const user = new User(
            response.email,
            response.password,
            response.localId,
            response.idToken,
            new Date(new Date().getTime() + parseInt(response.expiresIn) * 1000)
          );
          this.user.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}
