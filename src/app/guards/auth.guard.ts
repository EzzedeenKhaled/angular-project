import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';

// Guard to allow only authenticated users
export const authGuard: CanActivateFn = async () => {
  const auth = inject(Auth);   // Firebase Auth
  const router = inject(Router); // Angular Router

  return new Promise<boolean>((resolve) => {
    // Check Firebase auth state
    onAuthStateChanged(auth, (user) => {
      if (user) resolve(true);        // User logged in: allow
      else {
        router.navigate(['/login']);  // Redirect if not logged in
        resolve(false);
      }
    });
  });
};