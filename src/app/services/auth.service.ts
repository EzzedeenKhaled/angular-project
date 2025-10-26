import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  currentUser = signal<User | null>(null);
  isAuthenticated = signal(false);

  constructor() {
    this.auth.onAuthStateChanged((user) => {
      this.currentUser.set(user);
      this.isAuthenticated.set(!!user);
    });
  }

  login(email: string, password: string) {
    return from(
      signInWithEmailAndPassword(this.auth, email, password).then((result) => {
        this.router.navigate(['/weather']);
        return result;
      })
    );
  }

  signup(email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password).then((result) => {
        this.router.navigate(['/weather']);
        return result;
      })
    );
  }

  logout(): void {
    signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    });
  }

  getAuthState(): Promise<boolean> {
    return new Promise((resolve) => {
      const unsub = this.auth.onAuthStateChanged((user) => {
        resolve(!!user);
        unsub();
      });
    });
  }
}