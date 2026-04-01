import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ContentService } from '../services/content.service';
import { SectionVisibility } from '../models/content.interfaces';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {
  private authService = inject(AuthService);
  private contentService = inject(ContentService);
  private router = inject(Router);

  sectionVisibility = this.contentService.sectionVisibility;

  sidebarItems = [
    { label: 'Dashboard', route: '/admin/dashboard', icon: 'bi bi-grid', visibilityKey: null },
    { label: 'Hero', route: '/admin/hero', icon: 'bi bi-star', visibilityKey: null },
    { label: 'About', route: '/admin/about', icon: 'bi bi-person', visibilityKey: 'about' as keyof SectionVisibility },
    { label: 'Stats', route: '/admin/stats', icon: 'bi bi-bar-chart', visibilityKey: 'stats' as keyof SectionVisibility },
    { label: 'Skills', route: '/admin/skills', icon: 'bi bi-tools', visibilityKey: 'skills' as keyof SectionVisibility },
    { label: 'Portfolio', route: '/admin/portfolio', icon: 'bi bi-images', visibilityKey: 'portfolio' as keyof SectionVisibility },
    { label: 'References', route: '/admin/services', icon: 'bi bi-briefcase', visibilityKey: 'services' as keyof SectionVisibility },
    { label: 'Testimonials', route: '/admin/testimonials', icon: 'bi bi-chat-quote', visibilityKey: 'testimonials' as keyof SectionVisibility },
    { label: 'Contact', route: '/admin/contact', icon: 'bi bi-envelope', visibilityKey: 'contact' as keyof SectionVisibility },
    { label: 'Header & Footer', route: '/admin/header-footer', icon: 'bi bi-layout-text-sidebar', visibilityKey: null },
  ];

  async toggleVisibility(key: keyof SectionVisibility, event: Event): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    await this.contentService.toggleSectionVisibility(key);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
