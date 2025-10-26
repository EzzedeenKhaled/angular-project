import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../models/shop.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard {
  @Input() product!: Product; // Product data to display
  @Input() isAdded: boolean = false; // Animation flag when added to cart
  @Output() addToCart = new EventEmitter<number>(); // Emit product ID on add

  // Generate array for star rating display
  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < Math.round(rating));
  }

  // Trigger add to cart event
  onAddToCart(): void {
    this.addToCart.emit(this.product.id);
  }
}