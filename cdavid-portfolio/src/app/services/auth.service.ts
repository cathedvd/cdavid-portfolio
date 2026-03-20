import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly PASSWORD_HASH = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'; // sha256 of 'password'
  private readonly SESSION_KEY = 'admin_authenticated';

  isAuthenticated = signal<boolean>(this.checkSession());

  async login(password: string): Promise<boolean> {
    const hash = await this.hashPassword(password);
    if (hash === this.PASSWORD_HASH) {
      sessionStorage.setItem(this.SESSION_KEY, 'true');
      this.isAuthenticated.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem(this.SESSION_KEY);
    this.isAuthenticated.set(false);
  }

  private checkSession(): boolean {
    return sessionStorage.getItem(this.SESSION_KEY) === 'true';
  }

  private async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
}
