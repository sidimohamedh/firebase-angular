import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  login() {
    if (this.email === '' || this.password === '') {
      alert('Please enter email and password');
      return;
    }
    this.authService.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }
}
