import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-search-task',
  imports: [FormsModule, MatIcon],
  templateUrl: './search-task.html',
  styleUrl: './search-task.css',
})
export class SearchTask {
  @Input() target!: 'Pending' | 'Done';

  showClear: boolean = false;

  searchInput?: string;

  @Output() search = new EventEmitter();

  searchClick() {
    this.showClear = true;
    this.search.emit({
      searchInput: this.searchInput,
      target: this.target,
    });
  }

  backspaceClick() {
    this.searchInput = '';
    this.showClear = false;
    this.search.emit({
      searchInput: this.searchInput,
      target: this.target,
    });
  }
}
