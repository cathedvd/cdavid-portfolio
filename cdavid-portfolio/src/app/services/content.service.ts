import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PortfolioSiteContent, SectionVisibility } from '../models/content.interfaces';
import { DEFAULT_CONTENT } from './content.defaults';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private http = inject(HttpClient);
  loaded = signal(false);

  private content = signal<PortfolioSiteContent>(structuredClone(DEFAULT_CONTENT));

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
  sectionVisibility = computed(() => this.content().sectionVisibility);

  constructor() {
    void this.refreshFromServer(true);

    if (typeof window !== 'undefined') {
      window.setInterval(() => {
        void this.refreshFromServer();
      }, 1500);
    }
  }

  async updateSection<K extends keyof PortfolioSiteContent>(section: K, data: PortfolioSiteContent[K]): Promise<boolean> {
    const next = { ...this.content(), [section]: structuredClone(data) };
    return this.persist(next);
  }

  async toggleSectionVisibility(section: keyof SectionVisibility): Promise<boolean> {
    const current = this.content().sectionVisibility;
    const updated = { ...current, [section]: !current[section] };
    return this.updateSection('sectionVisibility', updated);
  }

  async resetSection(section: keyof PortfolioSiteContent): Promise<boolean> {
    const next = { ...this.content(), [section]: structuredClone(DEFAULT_CONTENT[section]) };
    return this.persist(next);
  }

  async resetAll(): Promise<boolean> {
    const next = structuredClone(DEFAULT_CONTENT);
    return this.persist(next);
  }

  exportContent(): string {
    return JSON.stringify(this.content(), null, 2);
  }

  async importContent(json: string): Promise<boolean> {
    try {
      const data = JSON.parse(json) as PortfolioSiteContent;
      return this.persist(this.mergeWithDefaults(data));
    } catch {
      return false;
    }
  }

  private async refreshFromServer(markLoaded = false): Promise<void> {
    try {
      const data = await firstValueFrom(this.http.get<PortfolioSiteContent>('/api/content'));
      this.content.set(this.mergeWithDefaults(data));
    } catch {
      // Keep current client state when the API is unavailable.
    } finally {
      if (markLoaded) {
        this.loaded.set(true);
      }
    }
  }

  private mergeWithDefaults(data: Partial<PortfolioSiteContent>): PortfolioSiteContent {
    return {
      ...structuredClone(DEFAULT_CONTENT),
      ...data
    };
  }

  private async persist(next: PortfolioSiteContent): Promise<boolean> {
    try {
      const saved = await firstValueFrom(this.http.post<PortfolioSiteContent>('/api/content', next));
      this.content.set(this.mergeWithDefaults(saved));
      return true;
    } catch (err) {
      console.error('Failed to save content:', err);
      return false;
    }
  }
}
