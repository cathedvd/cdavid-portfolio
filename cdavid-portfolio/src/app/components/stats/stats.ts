import { Component, AfterViewInit, inject } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { StatItem } from '../../models/content.interfaces';

declare class PureCounter {
  constructor(options?: Record<string, unknown>);
}

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.html',
  styleUrl: './stats.scss',
})
export class Stats implements AfterViewInit {
  private contentService = inject(ContentService);
  stats = this.contentService.stats;

  visibleItems(): StatItem[] {
    return this.stats().items.filter(item => item.visible !== false);
  }

  ngAfterViewInit(): void {
    new PureCounter();
  }
}
