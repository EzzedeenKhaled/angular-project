import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  email = '';
  password = '';
  confirmPassword = '';

  authService = inject(AuthService);

  signup() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;          
    }
    this.authService.signup(this.email, this.password);
  }
}