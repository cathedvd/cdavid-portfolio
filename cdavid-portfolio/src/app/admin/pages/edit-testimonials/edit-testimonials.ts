import { Component, inject, signal } from '@angular/core';
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

  addItem(): void { this.data.items.push({ quote: '', clientImage: '', clientName: '', clientPosition: '', highlight: false }); }
  removeItem(i: number): void { this.data.items.splice(i, 1); }

  save(): void {
    this.contentService.updateSection('testimonials', structuredClone(this.data));
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2000);
  }

  reset(): void {
    if (confirm('Reset Testimonials to defaults?')) {
      this.contentService.resetSection('testimonials');
      this.data = structuredClone(this.contentService.testimonials());
    }
  }
}
