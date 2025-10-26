import { Component, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, MatIconModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  // Form fields
  email = '';
  password = '';
  
  // Signal for displaying error messages in the template
  errorMessage = signal<string>('');

  // Injecting the AuthService for authentication
  authService = inject(AuthService);

  // Login function triggered on form submission
  login() {
    this.errorMessage.set(''); // Clear previous errors

    // Validate email field
    if (!this.email.trim()) {
      this.errorMessage.set('Email cannot be empty');
      return;
    }

    // Validate password field
    if (!this.password.trim()) {
      this.errorMessage.set('Password cannot be empty');
      return;
    }

    // Attempt login via AuthService
    try {
      this.authService.login(this.email, this.password);
    } catch (err) {
      // Set error message if login fails
      this.errorMessage.set(err instanceof Error ? err.message : 'An error occurred during login');
    }
  }
}