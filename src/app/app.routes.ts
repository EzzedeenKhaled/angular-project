import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { authGuard } from './guards/auth.guard';
import { WeatherComponent } from './weather/weather.component';
import { ShopComponent } from './shop/shop.component';
import { GuestGuard } from './guards/guest.guard';

/**
 * Application routes configuration
 * - Protects routes using authGuard and GuestGuard
 * - Redirects empty path to login
 */
export const routes: Routes = [
  // Signup page accessible only to guests
  { path: 'signup', component: Signup, canActivate: [GuestGuard] },

  // Login page accessible only to guests
  { path: 'login', component: Login, canActivate: [GuestGuard] },

  // Redirect root path to login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Weather page accessible only to authenticated users
  { path: 'weather', component: WeatherComponent, canActivate: [authGuard] },

  // Shop page accessible only to authenticated users
  { path: 'shop', component: ShopComponent, canActivate: [authGuard] },
];
