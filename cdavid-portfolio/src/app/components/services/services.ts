import { Component, inject } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { ReferenceItem } from '../../models/content.interfaces';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  private contentService = inject(ContentService);
  services = this.contentService.services;

  visibleItems(): ReferenceItem[] {
    return this.services().items.filter(item => item.visible !== false);
  }
}
