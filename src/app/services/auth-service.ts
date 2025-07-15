import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, take, tap } from 'rxjs';
import { User } from '../components/login/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiToken: string = 'AIzaSyCgsiadYjM6yPFkD_qYxOc6jh35_VbafoI';

  user = new BehaviorSubject<User | null>(null);

  httpClient = inject(HttpClient);

  refreshUser() {
    const userData = localStorage.getItem('userData');
    const user = userData ? JSON.parse(userData) : null;
    if (user && user.getIdToken) {
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
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          this.apiToken,
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
            response.expiresIn
          );
          this.user.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
  }
}
