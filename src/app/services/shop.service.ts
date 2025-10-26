import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/shop.model';

@Injectable({ providedIn: 'root' })
export class ShopService {
  products = signal<Product[]>([]); // All products
  loading = signal<boolean>(true); // Loading state
  selectedCategory = signal<string>('all'); // Currently selected category
  addedAnimation = signal<Set<number>>(new Set()); // Track products with animation
  error = signal<string | null>(null); // Error message

  // List of categories; empty if there's an error
  categories = computed(() => {
    if (this.error()) return; // Skip if error exists

    const cats = new Set<string>();
    cats.add('all'); // Default "all" category
    this.products().forEach(p => cats.add(p.category));
    return Array.from(cats);
  });

  // Products filtered by selected category
  filteredProducts = computed(() => {
    const category = this.selectedCategory();
    if (category === 'all') return this.products();
    return this.products().filter(p => p.category === category);
  });
}
