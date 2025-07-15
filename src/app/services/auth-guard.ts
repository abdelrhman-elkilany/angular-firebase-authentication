import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { CanActivate, Router } from '@angular/router';
import { map, take, type Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  authService = inject(AuthService);
  router = inject(Router);

  canActivate(): Observable<boolean> {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        if (user?.getIdToken) {
          return true;
        } else {
          this.router.navigate(['/'], { queryParams: { message: 'login_required' } });
          return false;
        }
      })
    );
  }
}
