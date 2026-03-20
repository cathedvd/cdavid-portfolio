import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  category: string;
  imagePath: string;
  detailedDescription: string;
  client: string;
  projectDate: string;
  projectUrl: string;
  additionalImages: string[];
}

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private http = inject(HttpClient);
  private apiUrl = '/api/portfolio';

  getPortfolio(): Observable<PortfolioProject[]> {
    return this.http.get<PortfolioProject[]>(this.apiUrl);
  }

  savePortfolio(data: PortfolioProject[]): Observable<PortfolioProject[]> {
    return this.http.post<PortfolioProject[]>(this.apiUrl, data);
  }

  uploadImage(file: File): Observable<{ filename: string; imagePath: string }> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<{ filename: string; imagePath: string }>(`${this.apiUrl}/upload`, formData);
  }

  deleteImage(filename: string): Observable<{ message: string; filename: string }> {
    return this.http.delete<{ message: string; filename: string }>(`${this.apiUrl}/upload/${filename}`);
  }
}
