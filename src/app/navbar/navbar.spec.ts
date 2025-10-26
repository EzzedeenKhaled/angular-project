import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Navbar } from './navbar';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
  let mockCartService: any;
  let mockAuthService: any;

  beforeEach(async () => {
    mockAuthService = {
      isAuthenticated: signal(false),
      logout: jasmine.createSpy('logout')
    };
    
    const cartCountSignal = signal(0);
    mockCartService = {
      cartCount: cartCountSignal,
      addToCart: jasmine.createSpy('addToCart').and.callFake(() => {
        cartCountSignal.set(cartCountSignal() + 1);
      })
    };

    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: CartService, useValue: mockCartService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reflect authentication state', () => {
    mockAuthService.isAuthenticated.set(true);
    expect(component.isLoggedIn()).toBe(true);
    
    mockAuthService.isAuthenticated.set(false);
    expect(component.isLoggedIn()).toBe(false);
  });

  it('should reflect cart count', () => {
    mockCartService.addToCart();
    expect(component.cartCount()).toBe(1);
  });

  it('should call logout on authService', () => {
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
  });
});