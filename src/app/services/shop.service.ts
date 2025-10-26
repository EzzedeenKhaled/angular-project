import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/shop.model';
@Injectable({ providedIn: 'root' })
export class ShopService  {
  products = signal<Product[]>([]);
  loading = signal<boolean>(true);
  selectedCategory = signal<string>('all');
  addedAnimation = signal<Set<number>>(new Set());

  categories = computed(() => {
    const cats = new Set<string>();
    cats.add('all');
    this.products().forEach(p => cats.add(p.category));
    return Array.from(cats);
  });

  filteredProducts = computed(() => {
    const category = this.selectedCategory();
    if (category === 'all') {
      return this.products();
    }
    return this.products().filter(p => p.category === category);
  });
}
