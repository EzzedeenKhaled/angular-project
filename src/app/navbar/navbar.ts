import { Component, computed } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar', 
  standalone: true,
  imports: [RouterLink, MatIconModule, RouterLinkActive, CommonModule],
  template: `
    <nav class="navbar" *ngIf="isLoggedIn()">
      <div class="container">
        <a routerLink="/weather" class="logo">
          <span class="logo-bg">
            <mat-icon>cloud</mat-icon>
          </span>
          <span class="brand">StormShop</span>
        </a>
        <div class="nav-links">
          <a
            routerLink="/weather"  
            routerLinkActive="active"
            class="nav-link"
          >
            <mat-icon>cloud</mat-icon>
            <span>Weather</span>
          </a>
          <a
            routerLink="/shop"
            routerLinkActive="active"
            class="nav-link"
          >
            <mat-icon>shopping_bag</mat-icon>
            <span>Shop</span>
          </a>
          <button class="logout-btn" (click)="logout()">
            <mat-icon>logout</mat-icon>
          </button>
        </div>
      </div>
    </nav>
  `,
  styleUrls: ['./navbar.css']
})
export class Navbar {
  authService = inject(AuthService);
  isLoggedIn = computed(() => this.authService.isAuthenticated());

  logout() {
    this.authService.logout();
  }
}