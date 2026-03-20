import { Component, inject } from '@angular/core';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private contentService = inject(ContentService);
  contact = this.contentService.contact;

  onSubmit(): void {
    // Contact form submission logic
  }
}
