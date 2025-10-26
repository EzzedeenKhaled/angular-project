import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar', 
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  // Inject auth and cart services
  authService = inject(AuthService);
  cartService = inject(CartService);
  
  // Reactive signals for authentication and cart count
  isLoggedIn = computed(() => this.authService.isAuthenticated());
  cartCount = computed(() => this.cartService.cartCount());

  // Logout handler
  logout() {
    this.authService.logout();
  }
}