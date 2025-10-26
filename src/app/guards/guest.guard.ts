import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
    private auth = inject(AuthService);
    private router = inject(Router);    

    async canActivate(): Promise<boolean> {
        const isLoggedIn = await this.auth.getAuthState();

        if (isLoggedIn) {
            this.router.navigate(['/weather']);
            return false;
        }
        return true;
    }
}