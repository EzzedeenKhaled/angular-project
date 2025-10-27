import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth, confirmPasswordReset } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  // === Dependency Injections ===
  private route = inject(ActivatedRoute); // For accessing query parameters (like oobCode)
  private router = inject(Router);        // For navigating after successful reset
  private auth = inject(Auth);            // Firebase Auth instance
  private title = inject(Title);          // To dynamically set the page title

  // === Component State ===
  oobCode: string = '';         // Code extracted from Firebase reset link
  password: string = '';        // New password entered by the user
  confirmPassword: string = ''; // Confirmed password for verification
  message: string = '';         // Feedback message displayed to the user
  success: boolean = false;     // Indicates whether reset was successful

  /**
   * Lifecycle hook that runs when the component initializes.
   * Sets the page title and extracts the 'oobCode' from the URL query parameters.
   */
  ngOnInit() {
    this.title.setTitle('Reset Password'); // Set the browser tab title

    // Extract the password reset code (oobCode) from the Firebase email link
    this.route.queryParams.subscribe(params => {
      this.oobCode = params['oobCode'] || '';
    });
  }

  /**
   * Handles password reset confirmation using Firebase Auth.
   * Validates inputs before sending the request.
   */
  async resetPassword() {
    // === Validate password length ===
    if (this.password.length < 6) {
      this.message = 'Password must be at least 6 characters long.';
      return;
    }

    // === Validate password confirmation ===
    if (this.password !== this.confirmPassword) {
      this.message = 'Passwords do not match.';
      return;
    }

    try {
      // Confirm the password reset using Firebase with the oobCode and new password
      await confirmPasswordReset(this.auth, this.oobCode, this.password);

      // Display success message and redirect to login page
      this.success = true;
      this.message = 'Password has been successfully reset!';
      setTimeout(() => this.router.navigate(['/login']), 2000);
    } catch (error: any) {
      // Handle invalid or expired reset links
      console.error(error);
      this.message = 'Invalid or expired reset link.';
    }
  }
}
