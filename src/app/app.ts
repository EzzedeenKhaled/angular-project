import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';

/** Root app component: renders Navbar and router outlet */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  template: `
    <app-navbar></app-navbar>  <!-- Global navigation bar -->
    <router-outlet></router-outlet>  <!-- Routed content -->
  `,
})
export class App {}
