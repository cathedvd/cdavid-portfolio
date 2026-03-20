import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../../services/content.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class AdminDashboard {
  private contentService = inject(ContentService);
  importSuccess = signal<boolean | null>(null);

  sections = [
    { label: 'Hero Section', route: '/admin/hero', icon: 'bi bi-star', description: 'Brand name, intro text, profile image, social links' },
    { label: 'About', route: '/admin/about', icon: 'bi bi-person', description: 'Profile info, bio, stats, details' },
    { label: 'Stats', route: '/admin/stats', icon: 'bi bi-bar-chart', description: 'Counter stats (clients, projects, etc.)' },
    { label: 'Skills', route: '/admin/skills', icon: 'bi bi-tools', description: 'Skill categories and progress bars' },
    { label: 'Portfolio', route: '/admin/portfolio', icon: 'bi bi-images', description: 'Portfolio items and filter categories' },
    { label: 'References', route: '/admin/services', icon: 'bi bi-briefcase', description: 'Reference cards with image, name, and position' },
    { label: 'Testimonials', route: '/admin/testimonials', icon: 'bi bi-chat-quote', description: 'Client reviews and quotes' },
    { label: 'Contact', route: '/admin/contact', icon: 'bi bi-envelope', description: 'Contact info, location, form settings' },
    { label: 'Header & Footer', route: '/admin/header-footer', icon: 'bi bi-layout-text-sidebar', description: 'Navigation links, social links, copyright' },
  ];

  exportContent(): void {
    const json = this.contentService.exportContent();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-content.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  importContent(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const success = await this.contentService.importContent(reader.result as string);
      this.importSuccess.set(success);
      setTimeout(() => this.importSuccess.set(null), 3000);
    };
    reader.readAsText(file);
    input.value = '';
  }

  async resetAll(): Promise<void> {
    if (confirm('Reset ALL content to defaults? This cannot be undone.')) {
      await this.contentService.resetAll();
    }
  }
}
