import { Component, inject, Input } from '@angular/core';
import { TasksService } from '../../services/tasks-service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-task',
  imports: [MatIcon],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task {
  @Input() data?: string;
  @Input() status?: 'Pending' | 'Done';

  markIcon!: string;
  taskService = inject(TasksService);

  ngOnInit(): void {
    this.markIcon =
      this.status === 'Pending'
        ? 'check_box_outline'
        : 'cancel';
  }

  markTask() {
    if (this.status === 'Pending') {
      this.taskService.markAsCompleted(this.data!);
    }
    if (this.status === 'Done') {
      this.taskService.markAsPending(this.data!);
    }
  }
}
