import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth-service';

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authServiceMock: any;
  let routerMock: any;
  let activatedRouteMock: any;

  beforeEach(() => {
    authServiceMock = {
      login: jasmine.createSpy('login'),
      user: of(null),
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    activatedRouteMock = {
      queryParams: of({}),
    };

    TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should login and navigate on successful login', () => {
    authServiceMock.login.and.returnValue(of({}));
    component.loginForm.setValue({ email: 'test@sumerge.com', password: '123456' });

    component.onSubmit();

    expect(authServiceMock.login).toHaveBeenCalledWith('test@sumerge.com', '123456');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/todo']);
    expect(component.loginForm.value.email).toBeNull();
    expect(component.loginForm.value.password).toBeNull();
  });

  it('should handle INVALID_LOGIN_CREDENTIALS error and reset form', () => {
    const errorResponse = {
      error: {
        error: {
          message: 'INVALID_LOGIN_CREDENTIALS',
        },
      },
    };

    authServiceMock.login.and.returnValue(throwError(() => errorResponse));
    component.loginForm.setValue({ email: 'wrong@email.com', password: 'wrong' });

    component.onSubmit();

    expect(component.errorMessage).toBe('Invalid email or password');
    expect(component.loginForm.value.email).toBeNull();
    expect(component.loginForm.value.password).toBeNull();
  });

  it('should handle general login error and reset form', () => {
    const errorResponse = {
      error: {
        error: {
          message: 'SOME_OTHER_ERROR',
        },
      },
    };

    authServiceMock.login.and.returnValue(throwError(() => errorResponse));
    component.loginForm.setValue({ email: 'test@email.com', password: 'wrong' });

    component.onSubmit();

    expect(component.errorMessage).toBe('Login failed');
  });

  it('should auto-redirect to /todo if user is already logged in', () => {
    const userMock = {
      getIdToken: () => Promise.resolve('token'),
    };

    authServiceMock.user = of(userMock);

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/todo']);
  });
});
