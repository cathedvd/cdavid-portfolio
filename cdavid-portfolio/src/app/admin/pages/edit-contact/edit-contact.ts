import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../../services/content.service';
import { ContactContent } from '../../../models/content.interfaces';

@Component({
  selector: 'app-edit-contact',
  imports: [FormsModule],
  templateUrl: './edit-contact.html',
  styleUrl: './edit-contact.scss',
})
export class EditContact {
  private contentService = inject(ContentService);
  data: ContactContent = structuredClone(this.contentService.contact());
  saved = signal(false);
  private hydrated = false;

  constructor() {
    effect(() => {
      if (!this.hydrated && this.contentService.loaded()) {
        this.data = structuredClone(this.contentService.contact());
        this.hydrated = true;
      }
    });
  }

  addPhone(): void { this.data.phones.push(''); }
  removePhone(i: number): void { this.data.phones.splice(i, 1); }
  addEmail(): void { this.data.emails.push(''); }
  removeEmail(i: number): void { this.data.emails.splice(i, 1); }

  async save(): Promise<void> {
    const success = await this.contentService.updateSection('contact', structuredClone(this.data));
    if (!success) return;

    this.data = structuredClone(this.contentService.contact());
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2000);
  }

  async reset(): Promise<void> {
    if (confirm('Reset Contact to defaults?')) {
      const success = await this.contentService.resetSection('contact');
      if (!success) return;
      this.data = structuredClone(this.contentService.contact());
    }
  }
}
