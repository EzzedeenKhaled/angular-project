import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  user$ = user(this.auth);

  async signup(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/home']); 
    } catch (error: any) {
      alert('Signup failed: ' + error.message);
    }
  }

  async login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/home']);
    } catch (error: any) {
      alert('Login failed: ' + error.message);
    }
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
}
