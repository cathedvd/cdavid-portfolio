import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../../services/content.service';
import { ServicesContent } from '../../../models/content.interfaces';

@Component({
  selector: 'app-edit-services',
  imports: [FormsModule],
  templateUrl: './edit-services.html',
  styleUrl: './edit-services.scss',
})
export class EditServices {
  private contentService = inject(ContentService);
  data: ServicesContent = structuredClone(this.contentService.services());
  saved = signal(false);

  get headingStr(): string { return this.data.headingLines.join('\n'); }
  set headingStr(val: string) { this.data.headingLines = val.split('\n').filter(Boolean); }

  addItem(): void { this.data.items.push({ icon: 'bi bi-star', titleMain: '', titleAccent: '', description: '' }); }
  removeItem(i: number): void { this.data.items.splice(i, 1); }

  save(): void {
    this.contentService.updateSection('services', structuredClone(this.data));
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2000);
  }

  reset(): void {
    if (confirm('Reset Services to defaults?')) {
      this.contentService.resetSection('services');
      this.data = structuredClone(this.contentService.services());
    }
  }
}
