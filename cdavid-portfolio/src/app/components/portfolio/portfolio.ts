import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import GLightbox from 'glightbox';
import { PortfolioService, PortfolioProject } from '../../services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  imports: [RouterLink],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio implements OnInit {
  private portfolioService = inject(PortfolioService);
  private lightbox: any = null;

  items = signal<PortfolioProject[]>([]);
  activeFilter = signal('*');

  filters = computed(() => {
    const categories = new Set<string>();
    this.items().forEach(item => {
      if (item.category) categories.add(item.category);
    });
    const result = [{ label: 'All Projects', filterValue: '*' }];
    categories.forEach(cat => {
      result.push({ label: cat, filterValue: cat });
    });
    return result;
  });

  filteredItems = computed(() => {
    const filter = this.activeFilter();
    if (filter === '*') return this.items();
    return this.items().filter(item => item.category === filter);
  });

  ngOnInit(): void {
    this.portfolioService.getPortfolio().subscribe({
      next: (data) => {
        this.items.set(data);
        setTimeout(() => this.initGlightbox(), 200);
      }
    });
  }

  setFilter(filterValue: string): void {
    this.activeFilter.set(filterValue);
    // Re-init GLightbox after filter changes the DOM
    setTimeout(() => this.initGlightbox(), 100);
  }

  private initGlightbox(): void {
    if (this.lightbox) {
      this.lightbox.destroy();
    }
    this.lightbox = (GLightbox as any)({
      selector: '.glightbox',
      closeButton: true,
    });
  }
}
