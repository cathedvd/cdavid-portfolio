import { Component, inject, signal } from '@angular/core';
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

  addCategory(): void { this.data.categories.push({ title: '', skills: [] }); }
  removeCategory(i: number): void { this.data.categories.splice(i, 1); }
  addSkill(catIdx: number): void { this.data.categories[catIdx].skills.push({ name: '', percentage: 50, tooltip: '' }); }
  removeSkill(catIdx: number, skillIdx: number): void { this.data.categories[catIdx].skills.splice(skillIdx, 1); }

  save(): void {
    this.contentService.updateSection('skills', structuredClone(this.data));
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2000);
  }

  reset(): void {
    if (confirm('Reset Skills to defaults?')) {
      this.contentService.resetSection('skills');
      this.data = structuredClone(this.contentService.skills());
    }
  }
}
