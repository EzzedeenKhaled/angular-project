import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';

  authService = inject(AuthService);

  login() {
    this.authService.login(this.email, this.password);
  }
}
