import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { authGuard } from './guards/auth.guard';
import { WeatherComponent } from './weather/weather.component';

export const routes: Routes = [
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'weather', component: WeatherComponent, canActivate: [authGuard] },

];
