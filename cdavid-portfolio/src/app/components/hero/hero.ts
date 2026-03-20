import { Component, AfterViewInit, OnDestroy, inject } from '@angular/core';
import Typed from 'typed.js';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements AfterViewInit, OnDestroy {
  private contentService = inject(ContentService);
  hero = this.contentService.hero;
  private typed: Typed | null = null;

  ngAfterViewInit(): void {
    this.typed = new Typed('.typed', {
      strings: this.hero().typedItems,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  ngOnDestroy(): void {
    this.typed?.destroy();
  }
}
