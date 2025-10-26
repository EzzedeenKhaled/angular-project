import { Component, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup', // Component selector
  standalone: true, // Standalone component (no module required)
  imports: [RouterLink, FormsModule], // Required imports for template
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {

  name = ''; // User's full name
  email = ''; // User's email
  password = ''; // User's password
  confirmPassword = ''; // Password confirmation

  errorMessage = signal<string>(''); // Signal to store error messages

  authService = inject(AuthService); // Inject AuthService for signup

  signup() {
    this.errorMessage.set(''); // Clear previous errors

    // Check if name is empty
    if (!this.name.trim()) {
      this.errorMessage.set('Name cannot be empty');
      return;
    }

    // Check if email is empty
    if (!this.email.trim()) {
      this.errorMessage.set('Email cannot be empty');
      return;
    }

    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      this.errorMessage.set('Passwords do not match!');
      return;          
    }

    // Check password length
    if (this.password.length < 6) {
      this.errorMessage.set('Password must be at least 6 characters long');
      return;
    }

    // Attempt signup
    try {
      this.authService.signup(this.email, this.password);
    } catch (err) {
      // Handle signup errors
      this.errorMessage.set(err instanceof Error ? err.message : 'An error occurred during signup');
    }
  }
}