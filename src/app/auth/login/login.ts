import { Component, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, MatIconModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  private title = inject(Title); // Inject Angular's Title service for setting the browser tab title

  ngOnInit() {
    // Set the page title to "Login" when this component is initialized
    this.title.setTitle('Login');
  }

  // Form fields
  email = '';
  password = '';

  // Signal for displaying error messages in the template
  errorMessage = signal<string>('');

  // Injecting the AuthService for authentication
  authService = inject(AuthService);

  // Login function triggered on form submission
  login() {
    this.errorMessage.set(''); // Clear previous error

    // Validate email is not empty
    if (!this.email.trim()) {
      this.errorMessage.set('Email cannot be empty');
      return;
    }

    // Simple email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      this.errorMessage.set('Please enter a valid email address');
      return;
    }

    // Validate password is not empty
    if (!this.password.trim()) {
      this.errorMessage.set('Password cannot be empty');
      return;
    }

    // Call AuthService to perform login
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        // Success — navigation handled inside AuthService
      },
      error: (err) => {
        // Display error message
        this.errorMessage.set('Invalid email or password');
      }
    });
  }
}