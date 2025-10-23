import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';

@Component({
  selector: 'app-root',
  imports: [Login, Signup, RouterOutlet],
  template: '<router-outlet></router-outlet>',
  styleUrl: './app.css'
})
export class App {
}
