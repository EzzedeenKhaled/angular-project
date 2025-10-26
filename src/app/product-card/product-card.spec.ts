import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCard } from './product-card';
import { Product } from '../models/shop.model';

describe('ProductCard Component', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;

  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test description',
    category: 'electronics',
    image: 'test.jpg',
    rating: { rate: 4.5, count: 100 }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;
    component.product = mockProduct; // provide input product
    fixture.detectChanges(); // trigger bindings
  });

  it('should create the component', () => {
    expect(component).toBeTruthy(); // component instance exists
  });

  it('should generate correct star array', () => {
    expect(component.getStarArray(4.5)).toEqual([true, true, true, true, true]); // star logic
  });

  it('should emit product id when adding to cart', () => {
    spyOn(component.addToCart, 'emit'); // spy on event emitter
    component.onAddToCart();
    expect(component.addToCart.emit).toHaveBeenCalledWith(1); // correct product id emitted
  });
});
