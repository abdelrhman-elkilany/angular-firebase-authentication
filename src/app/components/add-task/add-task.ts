import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../services/tasks-service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-add-task',
  imports: [FormsModule, MatIcon],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask {
  task?: string;
  tasksService = inject(TasksService);
  isLoading = false;

  addTask(): void {
    if (this.task) {
      this.submitTask();
    }
  }

  private submitTask(): void {
    this.isLoading = true;
    this.tasksService.addTask(this.task!).subscribe({
      next: () => this.handleTaskSuccess(),
      error: (error) => this.handleTaskError(error),
    });
    this.task = '';
  }

  private handleTaskSuccess(): void {
    this.isLoading = false;
  }

  private handleTaskError(error: any): void {
    console.error('Error adding task:', error);
    this.tasksService.errorMessage.set('Failed to add task');
    this.isLoading = false;
  }
}
