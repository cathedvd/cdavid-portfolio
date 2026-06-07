import { Component, inject } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { AboutContent } from '../../models/content.interfaces';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private contentService = inject(ContentService);
  about = this.contentService.about;

  visibleStats(data: AboutContent = this.about()): AboutContent['stats'] {
    return data.stats.filter(stat => stat.visible !== false);
  }

  visibleDetails(data: AboutContent = this.about()): AboutContent['details'] {
    return data.details.filter(detail => detail.visible !== false);
  }

  downloadResume(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const link = document.createElement('a');
    link.href = '/assets/Cathereen-David-Resume.pdf';
    link.download = 'Cathereen-David-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
