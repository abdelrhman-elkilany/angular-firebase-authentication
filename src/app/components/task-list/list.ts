import {
  Component,
  computed,
  effect,
  inject,
  Input,
  signal,
  type OnInit,
  type Signal,
} from '@angular/core';
import { AddTask } from '../add-task/add-task';
import { SearchTask } from '../search-task/search-task';
import { Task } from '../task/task';
import { TasksService } from '../../services/tasks-service';

@Component({
  selector: 'app-list',
  imports: [AddTask, SearchTask, Task],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List implements OnInit {
  @Input() status!: 'Pending' | 'Done';
  taskService = inject(TasksService);
  filteredTasks = signal<string[]>([]);

  tasksEffect = effect(() => {
    this.filteredTasks.set(
      this.status === 'Pending'
        ? this.taskService.pendingTasks()
        : this.taskService.doneTasks()
    );
  });

  ngOnInit(): void {
    this.taskService.spinner.set(true);
    this.taskService.getTasks(this.status).subscribe({
      next: () => {
        this.taskService.spinner.set(false);
      },
    });
  }

  search(data: { searchInput: string; target: string }): void {
    if (this.isTargetMatchingStatus(data.target)) {
      if (this.isSearchInputEmpty(data.searchInput)) {
        this.resetFilteredTasks();
      } else {
        this.filterTasks(data.searchInput);
      }
    }
  }

  private isTargetMatchingStatus(target: string): boolean {
    return target === this.status;
  }

  private isSearchInputEmpty(searchInput: string): boolean {
    return !searchInput;
  }

  private resetFilteredTasks(): void {
    this.filteredTasks.set(
      this.status === 'Pending'
        ? this.taskService.pendingTasks()
        : this.taskService.doneTasks()
    );
  }

  private filterTasks(searchInput: string): void {
    this.filteredTasks.update((fullTasks: string[]) =>
      fullTasks.filter((task) => task.toLowerCase().includes(searchInput))
    );
  }
}
