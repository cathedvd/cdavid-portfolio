import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
@Component({
  selector: 'app-service-details',
  imports: [RouterLink, Header, Footer],
  templateUrl: './service-details.html',
  styleUrl: './service-details.scss',
})
export class ServiceDetails implements AfterViewInit {
  ngAfterViewInit(): void {
    new Swiper('.service-details-slider', {
      modules: [Autoplay, Pagination],
      loop: true,
      speed: 600,
      autoplay: { delay: 5000 },
      slidesPerView: 1,
      pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true }
    });
  }
}
