import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { authGuard } from './guards/auth.guard';
import { WeatherComponent } from './weather/weather.component';
import { ShopComponent } from './shop/shop.component';
import { GuestGuard } from './guards/guest.guard';
export const routes: Routes = [
  { path: 'signup', component: Signup, canActivate: [GuestGuard] },
  { path: 'login', component: Login, canActivate: [GuestGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'weather', component: WeatherComponent, canActivate: [authGuard] },
  { path: 'shop', component: ShopComponent, canActivate: [authGuard] },
];
