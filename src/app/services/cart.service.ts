import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<Map<number, number>>(new Map());

  cartCount = computed(() => {
    let total = 0;
    this.cartItems().forEach(quantity => total += quantity);
    return total;
  });

  addToCart(productId: number): void {
    const currentCart = new Map(this.cartItems());
    const currentQuantity = currentCart.get(productId) || 0;
    currentCart.set(productId, currentQuantity + 1);
    this.cartItems.set(currentCart);
  }
}