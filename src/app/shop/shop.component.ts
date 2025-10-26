import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { inject } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { ShopService } from '../services/shop.service';
import { Product } from '../models/shop.model';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ProductCard],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  private cartService = inject(CartService); // Inject cart service
  private http = inject(HttpClient); // Inject HttpClient
  private shopService = inject(ShopService); // Inject shop service

  // Signals from ShopService
  get products() { return this.shopService.products(); }
  get loading() { return this.shopService.loading(); }
  get categories() { return this.shopService.categories(); }
  get filteredProducts() { return this.shopService.filteredProducts(); }
  get selectedCategory() { return this.shopService.selectedCategory(); }
  get addedAnimation() { return this.shopService.addedAnimation(); }
  get error() { return this.shopService.error(); }

  // Fetch products on init
  ngOnInit(): void { this.fetchProducts(); }

  // Fetch products from API
  fetchProducts(): void {
    this.http.get<Product[]>('https://fakestoreapi.com/products')
      .subscribe({
        next: (data) => {
          this.shopService.products.set(data);
          this.shopService.loading.set(false);
          this.shopService.error.set(null);
        },
        error: () => {
          this.shopService.loading.set(false);
          this.shopService.error.set('Failed to fetch products. Please try again.');
        }
      });
  }

  // Add product to cart with animation
  addToCart(productId: number): void {
    this.cartService.addToCart();

    const animations = new Set(this.shopService.addedAnimation());
    animations.add(productId);
    this.shopService.addedAnimation.set(animations);

    // Remove animation after 1s
    setTimeout(() => {
      const animations = new Set(this.shopService.addedAnimation());
      animations.delete(productId);
      this.shopService.addedAnimation.set(animations);
    }, 1000);
  }

  // Change selected category
  selectCategory(category: string): void {
    this.shopService.selectedCategory.set(category);
  }

  // Check if product is added
  isAdded(productId: number): boolean {
    return this.shopService.addedAnimation().has(productId);
  }
}
