import { Component, inject } from '@angular/core';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private contentService = inject(ContentService);
  about = this.contentService.about;

  downloadResume(): void {
    const link = document.createElement('a');
    link.href = '/assets/Cathereen-David-Resume.pdf';
    link.download = 'Cathereen-David-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
