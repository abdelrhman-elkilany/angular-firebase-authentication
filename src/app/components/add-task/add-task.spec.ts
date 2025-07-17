import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTask } from './add-task';
import { of, throwError } from 'rxjs';
import { TasksService } from '../../services/tasks-service';

describe('AddTask Component', () => {
  let component: AddTask;
  let fixture: ComponentFixture<AddTask>;
  let tasksServiceMock: any;

  beforeEach(() => {
    tasksServiceMock = {
      addTask: jasmine.createSpy('addTask'),
      errorMessage: {
        set: jasmine.createSpy('set'),
      },
    };

    TestBed.configureTestingModule({
      imports: [AddTask],
      providers: [{ provide: TasksService, useValue: tasksServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTask);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not call addTask if task is empty', () => {
    component.task = '';
    component.addTask();
    expect(tasksServiceMock.addTask).not.toHaveBeenCalled();
  });

  it('should call addTask and clear input when task is provided', () => {
    const mockObservable = of(null);
    tasksServiceMock.addTask.and.returnValue(mockObservable);

    component.task = 'New Task';
    component.addTask();
    expect(tasksServiceMock.addTask).toHaveBeenCalledWith('New Task');
    expect(component.task).toBe('');
  });

  it('should set error message and reset loading on failure', () => {
    const errorResponse = { message: 'Something went wrong' };
    tasksServiceMock.addTask.and.returnValue(throwError(() => errorResponse));

    spyOn(console, 'error');
    component.task = 'Failing Task';
    component.addTask();
    expect(tasksServiceMock.addTask).toHaveBeenCalled();
    expect(tasksServiceMock.errorMessage.set).toHaveBeenCalledWith(
      'Failed to add task'
    );
    expect(console.error).toHaveBeenCalledWith(
      'Error adding task:',
      errorResponse
    );
  });
});
