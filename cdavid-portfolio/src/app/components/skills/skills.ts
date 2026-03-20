import { Component, AfterViewInit, inject } from '@angular/core';
import { ContentService } from '../../services/content.service';

declare class Waypoint {
  constructor(options: Record<string, unknown>);
}

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills implements AfterViewInit {
  private contentService = inject(ContentService);
  skills = this.contentService.skills;

  ngAfterViewInit(): void {
    const skillsAnimations = document.querySelectorAll('.skills-animation');
    skillsAnimations.forEach((item) => {
      new Waypoint({
        element: item,
        offset: '80%',
        handler: () => {
          const progressBars = item.querySelectorAll('.progress .progress-bar') as NodeListOf<HTMLElement>;
          progressBars.forEach(el => {
            el.style.width = el.getAttribute('aria-valuenow') + '%';
          });
        }
      });
    });
  }
}
