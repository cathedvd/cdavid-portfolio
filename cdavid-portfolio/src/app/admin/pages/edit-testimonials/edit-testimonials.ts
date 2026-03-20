import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../../services/content.service';
import { TestimonialsContent } from '../../../models/content.interfaces';

@Component({
  selector: 'app-edit-testimonials',
  imports: [FormsModule],
  templateUrl: './edit-testimonials.html',
  styleUrl: './edit-testimonials.scss',
})
export class EditTestimonials {
  private contentService = inject(ContentService);
  data: TestimonialsContent = structuredClone(this.contentService.testimonials());
  saved = signal(false);
  private hydrated = false;

  constructor() {
    effect(() => {
      if (!this.hydrated && this.contentService.loaded()) {
        this.data = structuredClone(this.contentService.testimonials());
        this.hydrated = true;
      }
    });
  }

  addItem(): void { this.data.items.push({ quote: '', clientImage: '', clientName: '', clientPosition: '', highlight: false }); }
  removeItem(i: number): void { this.data.items.splice(i, 1); }

  async save(): Promise<void> {
    const success = await this.contentService.updateSection('testimonials', structuredClone(this.data));
    if (!success) return;

    this.data = structuredClone(this.contentService.testimonials());
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2000);
  }

  async reset(): Promise<void> {
    if (confirm('Reset Testimonials to defaults?')) {
      const success = await this.contentService.resetSection('testimonials');
      if (!success) return;
      this.data = structuredClone(this.contentService.testimonials());
    }
  }
}
