import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {
  private authService = inject(AuthService);
  private router = inject(Router);

  sidebarItems = [
    { label: 'Dashboard', route: '/admin/dashboard', icon: 'bi bi-grid' },
    { label: 'Hero', route: '/admin/hero', icon: 'bi bi-star' },
    { label: 'About', route: '/admin/about', icon: 'bi bi-person' },
    { label: 'Stats', route: '/admin/stats', icon: 'bi bi-bar-chart' },
    { label: 'Skills', route: '/admin/skills', icon: 'bi bi-tools' },
    { label: 'Portfolio', route: '/admin/portfolio', icon: 'bi bi-images' },
    { label: 'Services', route: '/admin/services', icon: 'bi bi-briefcase' },
    { label: 'Testimonials', route: '/admin/testimonials', icon: 'bi bi-chat-quote' },
    { label: 'Contact', route: '/admin/contact', icon: 'bi bi-envelope' },
    { label: 'Header & Footer', route: '/admin/header-footer', icon: 'bi bi-layout-text-sidebar' },
  ];

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
