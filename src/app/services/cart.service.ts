import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  private count = signal(0); // Tracks number of items in cart

  cartCount = computed(() => this.count()); // Exposed computed count

  // Increment cart count
  addToCart(): void {
    this.count.set(this.count() + 1);
  }
}