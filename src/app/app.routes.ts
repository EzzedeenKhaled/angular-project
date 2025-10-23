import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Home } from './home/home';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: Home, canActivate: [authGuard] }
];
