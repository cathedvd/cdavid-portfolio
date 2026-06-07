import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../../services/content.service';
import { HeroContent } from '../../../models/content.interfaces';
import { DEFAULT_CONTENT } from '../../../services/content.defaults';

@Component({
  selector: 'app-edit-hero',
  imports: [FormsModule],
  templateUrl: './edit-hero.html',
  styleUrl: './edit-hero.scss',
})
export class EditHero {
  private contentService = inject(ContentService);
  data: HeroContent = structuredClone(this.contentService.hero());
  saved = signal(false);
  private hydrated = false;

  constructor() {
    effect(() => {
      if (!this.hydrated && this.contentService.loaded()) {
        this.data = structuredClone(this.contentService.hero());
        this.hydrated = true;
      }
    });
  }

  get typedItemsStr(): string {
    return this.data.typedItems.join(', ');
  }
  set typedItemsStr(val: string) {
    this.data.typedItems = val.split(',').map(s => s.trim()).filter(Boolean);
  }

  addSocialLink(): void {
    this.data.socialLinks.push({ icon: 'bi bi-link', url: '#' });
  }

  removeSocialLink(i: number): void {
    this.data.socialLinks.splice(i, 1);
  }

  hasButton(type: 'primary' | 'secondary'): boolean {
    const button = type === 'primary' ? this.data.ctaPrimary : this.data.ctaSecondary;
    return Boolean(button.text.trim() || button.link.trim());
  }

  removeButton(type: 'primary' | 'secondary'): void {
    if (type === 'primary') {
      this.data.ctaPrimary = { text: '', link: '' };
      return;
    }

    this.data.ctaSecondary = { text: '', link: '' };
  }

  restoreButton(type: 'primary' | 'secondary'): void {
    if (type === 'primary') {
      this.data.ctaPrimary = structuredClone(DEFAULT_CONTENT.hero.ctaPrimary);
      return;
    }

    this.data.ctaSecondary = structuredClone(DEFAULT_CONTENT.hero.ctaSecondary);
  }

  async save(): Promise<void> {
    const success = await this.contentService.updateSection('hero', structuredClone(this.data));
    if (!success) return;

    this.data = structuredClone(this.contentService.hero());
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2000);
  }

  async reset(): Promise<void> {
    if (confirm('Reset Hero to defaults?')) {
      const success = await this.contentService.resetSection('hero');
      if (!success) return;
      this.data = structuredClone(this.contentService.hero());
    }
  }
}
