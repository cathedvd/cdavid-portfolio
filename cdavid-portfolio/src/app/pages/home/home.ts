import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Header } from '../../components/header/header';
import { Hero } from '../../components/hero/hero';
import { About } from '../../components/about/about';
import { Stats } from '../../components/stats/stats';
import { Skills } from '../../components/skills/skills';
import { Portfolio } from '../../components/portfolio/portfolio';
import { Services } from '../../components/services/services';
import { Contact } from '../../components/contact/contact';
import { Footer } from '../../components/footer/footer';
@Component({
  selector: 'app-home',
  imports: [
    Header,
    Hero,
    About,
    Stats,
    Skills,
    Portfolio,
    Services,
    Contact,
    Footer
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit, OnDestroy {
  private scrollHandler = this.onScroll.bind(this);

  ngAfterViewInit(): void {
    window.addEventListener('scroll', this.scrollHandler);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  private onScroll(): void {
    this.toggleScrollTop();
    this.updateScrollSpy();
  }

  private toggleScrollTop(): void {
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  private updateScrollSpy(): void {
    document.querySelectorAll('.navmenu a').forEach(navLink => {
      const anchor = navLink as HTMLAnchorElement;
      if (!anchor.hash) return;
      const section = document.querySelector(anchor.hash) as HTMLElement;
      if (!section) return;
      const position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        anchor.classList.add('active');
      } else {
        anchor.classList.remove('active');
      }
    });
  }

  scrollToTop(event: Event): void {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
