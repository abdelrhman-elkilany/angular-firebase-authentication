import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModuleModule } from './material-module/material-module-module';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MaterialModuleModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-authentication');

  authService = inject(AuthService);
  ngAfterContentInit(): void {
    this.authService.refreshUser();
    this.authService.user.subscribe((user) => {
      console.log('User in App Component:', user);
    });
  }
}
