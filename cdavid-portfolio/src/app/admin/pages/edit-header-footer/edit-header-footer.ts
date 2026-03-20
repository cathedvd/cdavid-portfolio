import { Component, inject, signal } from '@angular/core';
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

  addNavItem(): void { this.headerData.navItems.push({ label: '', href: '#', icon: 'bi bi-link navicon' }); }
  removeNavItem(i: number): void { this.headerData.navItems.splice(i, 1); }
  addSocialLink(): void { this.headerData.socialLinks.push({ icon: 'bi bi-link', url: '#' }); }
  removeSocialLink(i: number): void { this.headerData.socialLinks.splice(i, 1); }

  save(): void {
    this.contentService.updateSection('header', structuredClone(this.headerData));
    this.contentService.updateSection('footer', structuredClone(this.footerData));
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2000);
  }

  reset(): void {
    if (confirm('Reset Header & Footer to defaults?')) {
      this.contentService.resetSection('header');
      this.contentService.resetSection('footer');
      this.headerData = structuredClone(this.contentService.header());
      this.footerData = structuredClone(this.contentService.footer());
    }
  }
}
