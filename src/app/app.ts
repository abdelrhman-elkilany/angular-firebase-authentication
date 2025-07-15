import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModuleModule } from './material-module/material-module-module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MaterialModuleModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-authentication');
}
