import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PortfolioService, PortfolioProject } from '../../../services/portfolio.service';

@Component({
  selector: 'app-edit-portfolio',
  imports: [FormsModule],
  templateUrl: './edit-portfolio.html',
  styleUrl: './edit-portfolio.scss',
})
export class EditPortfolio implements OnInit {
  private portfolioService = inject(PortfolioService);

  items = signal<PortfolioProject[]>([]);
  saved = signal(false);
  loading = signal(true);
  uploading = signal<string | null>(null); // 'main-0', 'additional-0-1', etc.

  ngOnInit(): void {
    this.portfolioService.getPortfolio().subscribe({
      next: (data) => {
        // Ensure new fields exist on old data
        const normalized = data.map(item => ({
          ...{ detailedDescription: '', client: '', projectDate: '', projectUrl: '', additionalImages: [] as string[] },
          ...item,
        }));
        this.items.set(normalized);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  addItem(): void {
    const newItem: PortfolioProject = {
      id: Date.now().toString(),
      title: '',
      description: '',
      category: '',
      imagePath: '',
      detailedDescription: '',
      client: '',
      projectDate: '',
      projectUrl: '',
      additionalImages: []
    };
    this.items.update(items => [...items, newItem]);
  }

  removeItem(index: number): void {
    const item = this.items()[index];
    // Delete main image
    this.deleteFileIfExists(item.imagePath);
    // Delete additional images
    item.additionalImages?.forEach(img => this.deleteFileIfExists(img));
    this.items.update(items => items.filter((_, i) => i !== index));
  }

  // Main image upload
  onMainImageSelect(event: Event, index: number): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploading.set('main-' + index);
    this.portfolioService.uploadImage(file).subscribe({
      next: (res) => {
        this.items.update(items => {
          const updated = [...items];
          updated[index] = { ...updated[index], imagePath: res.imagePath };
          return updated;
        });
        this.uploading.set(null);
      },
      error: () => this.uploading.set(null)
    });
    (event.target as HTMLInputElement).value = '';
  }

  removeMainImage(index: number): void {
    this.deleteFileIfExists(this.items()[index].imagePath);
    this.items.update(items => {
      const updated = [...items];
      updated[index] = { ...updated[index], imagePath: '' };
      return updated;
    });
  }

  // Additional images
  onAdditionalImageSelect(event: Event, itemIndex: number): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploading.set('additional-' + itemIndex);
    this.portfolioService.uploadImage(file).subscribe({
      next: (res) => {
        this.items.update(items => {
          const updated = [...items];
          const imgs = [...(updated[itemIndex].additionalImages || []), res.imagePath];
          updated[itemIndex] = { ...updated[itemIndex], additionalImages: imgs };
          return updated;
        });
        this.uploading.set(null);
      },
      error: () => this.uploading.set(null)
    });
    (event.target as HTMLInputElement).value = '';
  }

  removeAdditionalImage(itemIndex: number, imgIndex: number): void {
    const img = this.items()[itemIndex].additionalImages?.[imgIndex];
    if (img) this.deleteFileIfExists(img);
    this.items.update(items => {
      const updated = [...items];
      const imgs = [...(updated[itemIndex].additionalImages || [])];
      imgs.splice(imgIndex, 1);
      updated[itemIndex] = { ...updated[itemIndex], additionalImages: imgs };
      return updated;
    });
  }

  updateField(index: number, field: keyof PortfolioProject, value: string): void {
    this.items.update(items => {
      const updated = [...items];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  save(): void {
    this.portfolioService.savePortfolio(this.items()).subscribe({
      next: () => {
        this.saved.set(true);
        setTimeout(() => this.saved.set(false), 2000);
      }
    });
  }

  private deleteFileIfExists(path: string): void {
    if (!path || !path.startsWith('/uploads/')) return;
    const filename = path.split('/').pop();
    if (filename) {
      this.portfolioService.deleteImage(filename).subscribe();
    }
  }
}
