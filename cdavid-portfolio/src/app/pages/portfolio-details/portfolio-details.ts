import { Component, OnInit, AfterViewInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { PortfolioService, PortfolioProject } from '../../services/portfolio.service';
import Swiper from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

@Component({
  selector: 'app-portfolio-details',
  imports: [RouterLink, Header, Footer],
  templateUrl: './portfolio-details.html',
  styleUrl: './portfolio-details.scss',
})
export class PortfolioDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private portfolioService = inject(PortfolioService);

  project = signal<PortfolioProject | null>(null);
  loading = signal(true);

  getAllImages(p: PortfolioProject): string[] {
    const images: string[] = [];
    if (p.imagePath) images.push(p.imagePath);
    if (p.additionalImages) images.push(...p.additionalImages);
    return images;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.portfolioService.getPortfolio().subscribe({
      next: (data) => {
        const found = data.find(p => p.id === id);
        this.project.set(found ?? null);
        this.loading.set(false);
        if (found) {
          setTimeout(() => this.initSwiper(), 200);
        }
      },
      error: () => this.loading.set(false)
    });
  }

  private initSwiper(): void {
    new Swiper('.portfolio-details-slider', {
      modules: [Autoplay, Pagination, Navigation],
      loop: true,
      speed: 600,
      autoplay: { delay: 5000 },
      slidesPerView: 1,
      pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
    });
  }
}
