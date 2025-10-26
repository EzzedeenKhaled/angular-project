import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
  private auth = inject(AuthService); // Inject Auth service
  private router = inject(Router);    // Inject Router for navigation

  // Only allow access if user is NOT logged in
  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.auth.getAuthState();

    if (isLoggedIn) {
      this.router.navigate(['/weather']); // Redirect logged-in users
      return false;
    }
    return true; // Allow guest users
  }
}