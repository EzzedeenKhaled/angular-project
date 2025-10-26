import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ShopComponent } from './shop.component';
import { CartService } from '../services/cart.service';
import { ShopService } from '../services/shop.service';

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;
  let cartService: CartService;
  let shopService: ShopService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        CartService,
        ShopService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    shopService = TestBed.inject(ShopService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy(); // check component instance
  });

  it('should set page title to Shop on init', () => {
    spyOn(component['title'], 'setTitle'); // track title service
    component.ngOnInit();
    expect(component['title'].setTitle).toHaveBeenCalledWith('Shop');
  });

  it('should add product to cart', () => {
    spyOn(cartService, 'addToCart'); // spy on cart service
    component.addToCart(1);
    expect(cartService.addToCart).toHaveBeenCalled(); 
    expect(component.isAdded(1)).toBe(true); // animation state updated
  });

  it('should select a category', () => {
    component.selectCategory('electronics');
    expect(shopService.selectedCategory()).toBe('electronics'); // category updated
  });

  it('should check if product is added', () => {
    shopService.addedAnimation.set(new Set([1, 2]));
    expect(component.isAdded(1)).toBe(true);
    expect(component.isAdded(3)).toBe(false); // only added products return true
  });
});
