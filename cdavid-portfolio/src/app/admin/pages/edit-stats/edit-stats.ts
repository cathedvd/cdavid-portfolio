import { Component, inject, signal } from '@angular/core';
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

  addItem(): void { this.data.items.push({ icon: 'bi bi-star', endValue: 0, label: '' }); }
  removeItem(i: number): void { this.data.items.splice(i, 1); }

  save(): void {
    this.contentService.updateSection('stats', structuredClone(this.data));
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2000);
  }

  reset(): void {
    if (confirm('Reset Stats to defaults?')) {
      this.contentService.resetSection('stats');
      this.data = structuredClone(this.contentService.stats());
    }
  }
}
