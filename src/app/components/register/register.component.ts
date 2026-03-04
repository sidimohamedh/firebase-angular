import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  register() {
    if (this.email === '' || this.password === '') {
      alert('Please enter email and password');
      return;
    }
    this.authService.register(this.email, this.password);
    this.email = '';
    this.password = '';
  }
}
