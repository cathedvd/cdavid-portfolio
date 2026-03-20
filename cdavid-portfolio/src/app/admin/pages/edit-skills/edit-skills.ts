import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../../services/content.service';
import { SkillsContent } from '../../../models/content.interfaces';

@Component({
  selector: 'app-edit-skills',
  imports: [FormsModule],
  templateUrl: './edit-skills.html',
  styleUrl: './edit-skills.scss',
})
export class EditSkills {
  private contentService = inject(ContentService);
  data: SkillsContent = structuredClone(this.contentService.skills());
  saved = signal(false);
  private hydrated = false;

  constructor() {
    effect(() => {
      if (!this.hydrated && this.contentService.loaded()) {
        this.data = structuredClone(this.contentService.skills());
        this.hydrated = true;
      }
    });
  }

  addCategory(): void { this.data.categories.push({ title: '', skills: [] }); }
  removeCategory(i: number): void { this.data.categories.splice(i, 1); }
  addSkill(catIdx: number): void { this.data.categories[catIdx].skills.push({ name: '', percentage: 50, tooltip: '' }); }
  removeSkill(catIdx: number, skillIdx: number): void { this.data.categories[catIdx].skills.splice(skillIdx, 1); }

  async save(): Promise<void> {
    const success = await this.contentService.updateSection('skills', structuredClone(this.data));
    if (!success) return;

    this.data = structuredClone(this.contentService.skills());
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2000);
  }

  async reset(): Promise<void> {
    if (confirm('Reset Skills to defaults?')) {
      const success = await this.contentService.resetSection('skills');
      if (!success) return;
      this.data = structuredClone(this.contentService.skills());
    }
  }
}
