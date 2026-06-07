import { Component, inject } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { TestimonialItem } from '../../models/content.interfaces';

@Component({
  selector: 'app-testimonials',
  imports: [],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class Testimonials {
  private contentService = inject(ContentService);
  testimonials = this.contentService.testimonials;

  visibleItems(): TestimonialItem[] {
    return this.testimonials().items.filter(item => item.visible !== false);
  }
}
