import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../../services/content.service';
import { StatsContent } from '../../../models/content.interfaces';

@Component({
  selector: 'app-edit-stats',
  imports: [FormsModule],
  templateUrl: './edit-stats.html',
  styleUrl: './edit-stats.scss',
})
export class EditStats {
  private contentService = inject(ContentService);
  data: StatsContent = structuredClone(this.contentService.stats());
  saved = signal(false);
  private hydrated = false;

  constructor() {
    effect(() => {
      if (!this.hydrated && this.contentService.loaded()) {
        this.data = structuredClone(this.contentService.stats());
        this.hydrated = true;
      }
    });
  }

  addItem(): void { this.data.items.push({ icon: 'bi bi-star', endValue: 0, label: '' }); }
  removeItem(i: number): void { this.data.items.splice(i, 1); }

  async save(): Promise<void> {
    const success = await this.contentService.updateSection('stats', structuredClone(this.data));
    if (!success) return;

    this.data = structuredClone(this.contentService.stats());
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2000);
  }

  async reset(): Promise<void> {
    if (confirm('Reset Stats to defaults?')) {
      const success = await this.contentService.resetSection('stats');
      if (!success) return;
      this.data = structuredClone(this.contentService.stats());
    }
  }
}
