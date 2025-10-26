import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { throwError } from 'rxjs';
import { Signup } from './signup';
import { AuthService } from '../../services/auth.service';

describe('Signup Component', () => {
  let component: Signup;
  let fixture: ComponentFixture<Signup>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['signup']);

    await TestBed.configureTestingModule({
      imports: [Signup],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Signup);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy(); // component instance exists
  });

  it('should set page title to Sign Up on init', () => {
    spyOn(component['title'], 'setTitle'); // spy on Title service
    component.ngOnInit();
    expect(component['title'].setTitle).toHaveBeenCalledWith('Sign Up');
  });

  it('should show error if name is empty', () => {
    component.name = '';
    component.email = 'test@test.com';
    component.password = 'password123';
    component.confirmPassword = 'password123';
    component.signup();
    expect(component.errorMessage()).toBe('Name cannot be empty'); // validation error
  });

  it('should show error if email is invalid', () => {
    component.name = 'Test User';
    component.email = 'invalid-email';
    component.password = 'password123';
    component.confirmPassword = 'password123';
    component.signup();
    expect(component.errorMessage()).toBe('Please enter a valid email address'); // validation error
  });

  it('should show error if passwords do not match', () => {
    component.name = 'Test User';
    component.email = 'test@test.com';
    component.password = 'password123';
    component.confirmPassword = 'different123';
    component.signup();
    expect(component.errorMessage()).toBe('Passwords do not match!'); // validation error
  });

  it('should show error if password is too short', () => {
    component.name = 'Test User';
    component.email = 'test@test.com';
    component.password = '123';
    component.confirmPassword = '123';
    component.signup();
    expect(component.errorMessage()).toBe('Password must be at least 6 characters long'); // validation error
  });

  it('should show error on signup failure', () => {
    authService.signup.and.returnValue(throwError(() => new Error('Signup failed')));
    component.name = 'Test User';
    component.email = 'test@test.com';
    component.password = 'password123';
    component.confirmPassword = 'password123';
    component.signup();
    expect(component.errorMessage()).toBe('Signup failed'); // error handling
  });
});