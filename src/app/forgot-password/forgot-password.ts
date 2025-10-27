import { Component, inject } from '@angular/core';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forgot-password',
  // Import required Angular modules and Material icons
  imports: [FormsModule, CommonModule, MatIconModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  // Inject Angular's Title service for setting the browser tab title
  private title = inject(Title);

  // Lifecycle hook: runs when the component is initialized
  ngOnInit() {
    // Set the browser tab title for better UX and accessibility
    this.title.setTitle('Forgot Password');
  }

  // Two-way bound email input field (via [(ngModel)] in template)
  email: string = '';

  // Holds feedback messages shown to the user
  message: string = '';

  // Inject Firebase Authentication service
  private auth = inject(Auth);

  /**
   * Sends a password reset email using Firebase Authentication.
   * Triggered when the user clicks the "Send Reset Link" button.
   */
  async resetPassword() {
    try {
      // Attempt to send a reset email to the provided address
      await sendPasswordResetEmail(this.auth, this.email);

      // Display success message — Firebase will handle the email delivery
      this.message = 'Password reset email sent! Check your inbox.';
    } catch (error: any) {
      // Show a generic error message if something goes wrong
      this.message = 'An error occurred while sending the reset email.';
    }
  }
}
