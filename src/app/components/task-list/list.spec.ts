import { ComponentFixture, TestBed } from '@angular/core/testing';
import { List } from './list';
import { TasksService } from '../../services/tasks-service';
import { of } from 'rxjs';

describe('List Component', () => {
  let component: List;
  let fixture: ComponentFixture<List>;
  let tasksServiceMock: any;

  beforeEach(() => {
    tasksServiceMock = {
      spinner: {
        set: jasmine.createSpy('set')
      },
      getTasks: jasmine.createSpy('getTasks').and.returnValue(of([])),
      pendingTasks: jasmine.createSpy('pendingTasks').and.returnValue(['task1', 'task2']),
      doneTasks: jasmine.createSpy('doneTasks').and.returnValue(['task3'])
    };

    TestBed.configureTestingModule({
      imports: [List],
      providers: [{ provide: TasksService, useValue: tasksServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(List);
    component = fixture.componentInstance;
    component.status = 'Pending';
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTasks and manage spinner on ngOnInit()', () => {
    component.ngOnInit();
    expect(tasksServiceMock.spinner.set).toHaveBeenCalledWith(true);
    expect(tasksServiceMock.getTasks).toHaveBeenCalledWith('Pending');
    expect(tasksServiceMock.spinner.set).toHaveBeenCalledWith(false);
  });

  it('should update filteredTasks for Pending tasks', () => {
    component.status = 'Pending';
    tasksServiceMock.pendingTasks.and.returnValue(['task1', 'task2']);
    fixture.detectChanges();
    expect(component.filteredTasks()).toEqual(['task1', 'task2']);
  });

  it('should update filteredTasks for Done tasks', () => {
    component.status = 'Done';
    tasksServiceMock.doneTasks.and.returnValue(['task3']);
    fixture.detectChanges();
    expect(component.filteredTasks()).toEqual(['task3']);
  });

  it('should reset filteredTasks when search input is empty and target matches status', () => {
    component.status = 'Pending';
    tasksServiceMock.pendingTasks.and.returnValue(['task1', 'task2']);
    component.search({ searchInput: '', target: 'Pending' });
    expect(component.filteredTasks()).toEqual(['task1', 'task2']);
  });

  it('should filter tasks based on search input', () => {
    component.status = 'Pending';
    component.filteredTasks.set(['First Task', 'Second Task', 'Another']);
    component.search({ searchInput: 'first', target: 'Pending' });
    expect(component.filteredTasks()).toEqual(['First Task']);
  });

  it('should not change filteredTasks if target does not match current status', () => {
    component.status = 'Done';
    component.filteredTasks.set(['Done Task']);
    component.search({ searchInput: 'done', target: 'Pending' });
    expect(component.filteredTasks()).toEqual(['Done Task']);
  });
});
