import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../../services/content.service';
import { AboutContent } from '../../../models/content.interfaces';

@Component({
  selector: 'app-edit-about',
  imports: [FormsModule],
  templateUrl: './edit-about.html',
  styleUrl: './edit-about.scss',
})
export class EditAbout {
  private contentService = inject(ContentService);
  data: AboutContent = structuredClone(this.contentService.about());
  saved = signal(false);
  private hydrated = false;

  constructor() {
    effect(() => {
      if (!this.hydrated && this.contentService.loaded()) {
        this.data = structuredClone(this.contentService.about());
        this.hydrated = true;
      }
    });
  }

  addParagraph(): void { this.data.descriptionParagraphs.push(''); }
  removeParagraph(i: number): void { this.data.descriptionParagraphs.splice(i, 1); }
  addStat(): void { this.data.stats.push({ number: '', label: '' }); }
  removeStat(i: number): void { this.data.stats.splice(i, 1); }
  addDetail(): void { this.data.details.push({ label: '', value: '' }); }
  removeDetail(i: number): void { this.data.details.splice(i, 1); }

  async save(): Promise<void> {
    const success = await this.contentService.updateSection('about', structuredClone(this.data));
    if (!success) return;

    this.data = structuredClone(this.contentService.about());
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2000);
  }

  async reset(): Promise<void> {
    if (confirm('Reset About to defaults?')) {
      const success = await this.contentService.resetSection('about');
      if (!success) return;
      this.data = structuredClone(this.contentService.about());
    }
  }
}
