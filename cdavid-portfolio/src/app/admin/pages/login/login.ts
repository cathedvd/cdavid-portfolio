import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class AdminLogin {
  private authService = inject(AuthService);
  private router = inject(Router);

  password = '';
  error = signal(false);
  loading = signal(false);

  async onLogin(): Promise<void> {
    this.error.set(false);
    this.loading.set(true);

    const success = await this.authService.login(this.password);
    this.loading.set(false);

    if (success) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.error.set(true);
    }
  }
}
