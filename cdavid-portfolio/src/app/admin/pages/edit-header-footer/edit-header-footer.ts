import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../../services/content.service';
import { HeaderContent, FooterContent } from '../../../models/content.interfaces';

@Component({
  selector: 'app-edit-header-footer',
  imports: [FormsModule],
  templateUrl: './edit-header-footer.html',
  styleUrl: './edit-header-footer.scss',
})
export class EditHeaderFooter {
  private contentService = inject(ContentService);
  headerData: HeaderContent = structuredClone(this.contentService.header());
  footerData: FooterContent = structuredClone(this.contentService.footer());
  saved = signal(false);
  private hydrated = false;

  constructor() {
    effect(() => {
      if (!this.hydrated && this.contentService.loaded()) {
        this.headerData = structuredClone(this.contentService.header());
        this.footerData = structuredClone(this.contentService.footer());
        this.hydrated = true;
      }
    });
  }

  addNavItem(): void { this.headerData.navItems.push({ label: '', href: '#', icon: 'bi bi-link navicon' }); }
  removeNavItem(i: number): void { this.headerData.navItems.splice(i, 1); }
  addSocialLink(): void { this.headerData.socialLinks.push({ icon: 'bi bi-link', url: '#' }); }
  removeSocialLink(i: number): void { this.headerData.socialLinks.splice(i, 1); }

  async save(): Promise<void> {
    const headerSaved = await this.contentService.updateSection('header', structuredClone(this.headerData));
    if (!headerSaved) return;

    const footerSaved = await this.contentService.updateSection('footer', structuredClone(this.footerData));
    if (!footerSaved) return;

    this.headerData = structuredClone(this.contentService.header());
    this.footerData = structuredClone(this.contentService.footer());
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2000);
  }

  async reset(): Promise<void> {
    if (confirm('Reset Header & Footer to defaults?')) {
      const headerReset = await this.contentService.resetSection('header');
      if (!headerReset) return;

      const footerReset = await this.contentService.resetSection('footer');
      if (!footerReset) return;

      this.headerData = structuredClone(this.contentService.header());
      this.footerData = structuredClone(this.contentService.footer());
    }
  }
}
