import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-header',
  imports: [NgClass],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private contentService = inject(ContentService);
  headerData = this.contentService.header;
  isOpen = false;

  toggleHeader(): void {
    this.isOpen = !this.isOpen;
  }

  closeOnMobile(): void {
    if (this.isOpen) {
      this.isOpen = false;
    }
  }
}
