import {
  Component,
  ElementRef,
  inject,
} from '@angular/core';
import { List } from '../components/task-list/list';
import { Spinner } from '../components/spinner/spinner';
import { ErrorModal } from '../components/error-modal/error-modal';
import { TasksService } from '../services/tasks-service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { AuthService } from '../services/auth-service';


@Component({
  selector: 'app-dashboard',
  imports: [List, Spinner, ErrorModal, MatToolbar, MatIcon, MatFabButton],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  taskService = inject(TasksService);
  spinner = this.taskService.spinner;
  errorMessage = this.taskService.errorMessage;
  authService = inject(AuthService);

  logout(){
    this.authService.logout();
  }

}
