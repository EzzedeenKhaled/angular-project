import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth); // Firebase Auth instance
  private router = inject(Router); // Angular Router

  currentUser = signal<User | null>(null); // Current signed-in user
  isAuthenticated = signal(false); // Boolean auth status

  constructor() {
    // Listen to auth state changes
    this.auth.onAuthStateChanged((user) => {
      this.currentUser.set(user);
      this.isAuthenticated.set(!!user);
    });
  }

  // Login with email/password
  login(email: string, password: string) {
    return from(
      signInWithEmailAndPassword(this.auth, email, password).then((result) => {
        this.router.navigate(['/weather']); // Navigate after login
        return result;
      })
    );
  }

  // Sign up with email/password
  signup(email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password).then((result) => {
        this.router.navigate(['/weather']); // Navigate after signup
        return result;
      })
    );
  }

  // Logout current user
  logout(): void {
    signOut(this.auth).then(() => {
      this.router.navigate(['/login']); // Navigate to login page
    });
  }

  // Check current auth state
  getAuthState(): Promise<boolean> {
    return new Promise((resolve) => {
      const unsub = this.auth.onAuthStateChanged((user) => {
        resolve(!!user);
        unsub();
      });
    });
  }
}