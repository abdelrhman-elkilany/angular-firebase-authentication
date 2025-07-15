import {
  Component,
  ElementRef,
  inject,
} from '@angular/core';
import { List } from '../components/task-list/list';
import { Spinner } from '../components/spinner/spinner';
import { ErrorModal } from '../components/error-modal/error-modal';
import { TasksService } from '../services/tasks-service';


@Component({
  selector: 'app-dashboard',
  imports: [List, Spinner, ErrorModal],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  taskService = inject(TasksService);
  spinner = this.taskService.spinner;
  errorMessage = this.taskService.errorMessage;

}
