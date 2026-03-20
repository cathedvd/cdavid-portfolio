import { Component, effect, inject, signal } from '@angular/core';
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
  private hydrated = false;

  constructor() {
    effect(() => {
      if (!this.hydrated && this.contentService.loaded()) {
        this.data = structuredClone(this.contentService.services());
        this.hydrated = true;
      }
    });
  }

  addItem(): void {
    this.data.items.push({
      image: 'assets/img/person/person-f-7.webp',
      name: '',
      position: ''
    });
  }
  removeItem(i: number): void { this.data.items.splice(i, 1); }

  async save(): Promise<void> {
    const success = await this.contentService.updateSection('services', structuredClone(this.data));
    if (!success) return;

    this.data = structuredClone(this.contentService.services());
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2000);
  }

  async reset(): Promise<void> {
    if (confirm('Reset References to defaults?')) {
      const success = await this.contentService.resetSection('services');
      if (!success) return;
      this.data = structuredClone(this.contentService.services());
    }
  }
}
