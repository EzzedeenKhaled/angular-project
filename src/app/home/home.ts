import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
    authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
