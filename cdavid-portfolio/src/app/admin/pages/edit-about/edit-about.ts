import { Component, inject, signal } from '@angular/core';
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

  addParagraph(): void { this.data.descriptionParagraphs.push(''); }
  removeParagraph(i: number): void { this.data.descriptionParagraphs.splice(i, 1); }
  addStat(): void { this.data.stats.push({ number: '', label: '' }); }
  removeStat(i: number): void { this.data.stats.splice(i, 1); }
  addDetail(): void { this.data.details.push({ label: '', value: '' }); }
  removeDetail(i: number): void { this.data.details.splice(i, 1); }

  save(): void {
    this.contentService.updateSection('about', structuredClone(this.data));
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2000);
  }

  reset(): void {
    if (confirm('Reset About to defaults?')) {
      this.contentService.resetSection('about');
      this.data = structuredClone(this.contentService.about());
    }
  }
}
