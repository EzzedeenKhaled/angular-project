import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Login } from './login';
import { AuthService } from '../../services/auth.service';

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let mockAuthService: any;

  beforeEach(async () => {
    // Mock AuthService
    mockAuthService = {
      login: jasmine.createSpy('login').and.returnValue(of({} as any))
    };

    // Setup TestBed with mocks
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges(); // run ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy(); // component instance exists
  });

  it('should set page title to Login on init', () => {
    spyOn(component['title'], 'setTitle'); // spy on Title service
    component.ngOnInit();
    expect(component['title'].setTitle).toHaveBeenCalledWith('Login');
  });

  it('should show error if email is empty', () => {
    component.email = '';
    component.password = 'password123';
    component.login();
    expect(component.errorMessage()).toBe('Email cannot be empty'); // validation
  });

  it('should show error if email is invalid', () => {
    component.email = 'invalid-email';
    component.password = 'password123';
    component.login();
    expect(component.errorMessage()).toBe('Please enter a valid email address'); // validation
  });

  it('should show error if password is empty', () => {
    component.email = 'test@test.com';
    component.password = '';
    component.login();
    expect(component.errorMessage()).toBe('Password cannot be empty'); // validation
  });

  it('should show error on login failure', () => {
    mockAuthService.login.and.returnValue(throwError(() => new Error('Login failed')));
    component.email = 'test@test.com';
    component.password = 'wrongpassword';
    component.login();
    expect(component.errorMessage()).toBe('Invalid email or password'); // handle login failure
  });
});
