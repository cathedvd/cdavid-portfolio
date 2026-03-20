import { Injectable, signal, computed } from '@angular/core';
import { PortfolioSiteContent } from '../models/content.interfaces';
import { DEFAULT_CONTENT } from './content.defaults';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly STORAGE_KEY = 'portfolio_content';

  private content = signal<PortfolioSiteContent>(this.loadContent());

  hero = computed(() => this.content().hero);
  about = computed(() => this.content().about);
  stats = computed(() => this.content().stats);
  skills = computed(() => this.content().skills);
  portfolio = computed(() => this.content().portfolio);
  services = computed(() => this.content().services);
  testimonials = computed(() => this.content().testimonials);
  contact = computed(() => this.content().contact);
  header = computed(() => this.content().header);
  footer = computed(() => this.content().footer);

  updateSection<K extends keyof PortfolioSiteContent>(section: K, data: PortfolioSiteContent[K]): void {
    this.content.update(c => ({ ...c, [section]: data }));
    this.persist();
  }

  resetSection(section: keyof PortfolioSiteContent): void {
    this.content.update(c => ({ ...c, [section]: DEFAULT_CONTENT[section] }));
    this.persist();
  }

  resetAll(): void {
    this.content.set({ ...DEFAULT_CONTENT });
    localStorage.removeItem(this.STORAGE_KEY);
  }

  exportContent(): string {
    return JSON.stringify(this.content(), null, 2);
  }

  importContent(json: string): boolean {
    try {
      const data = JSON.parse(json) as PortfolioSiteContent;
      this.content.set({ ...DEFAULT_CONTENT, ...data });
      this.persist();
      return true;
    } catch {
      return false;
    }
  }

  private loadContent(): PortfolioSiteContent {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_CONTENT, ...JSON.parse(stored) };
      }
    } catch { /* ignore parse errors */ }
    return { ...DEFAULT_CONTENT };
  }

  private persist(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.content()));
  }
}
