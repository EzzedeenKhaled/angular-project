import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { App } from './app';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';

describe('App Component', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  
  beforeEach(async () => {
    // Mock AuthService
    const mockAuthService = {
      isAuthenticated: signal(false),
      logout: jasmine.createSpy('logout')
    };

    // Mock CartService
    const mockCartService = {
      cartCount: signal(0),
      addToCart: jasmine.createSpy('addToCart')
    };

    // Setup TestBed with mocks
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: CartService, useValue: mockCartService }
      ],
      schemas: [NO_ERRORS_SCHEMA] // ignore unknown elements like router-outlet
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges(); // run ngOnInit and bindings
  });

  it('should create the app', () => {
    expect(component).toBeTruthy(); // component instance exists
  });

  it('should render navbar and router outlet', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-navbar')).toBeTruthy(); // navbar exists
    expect(compiled.querySelector('router-outlet')).toBeTruthy(); // router outlet exists
  });
});