import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'portfolio-details/:id',
    loadComponent: () => import('./pages/portfolio-details/portfolio-details').then(m => m.PortfolioDetails)
  },
  {
    path: 'service-details',
    loadComponent: () => import('./pages/service-details/service-details').then(m => m.ServiceDetails)
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./admin/pages/login/login').then(m => m.AdminLogin)
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin-layout').then(m => m.AdminLayout),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./admin/pages/dashboard/dashboard').then(m => m.AdminDashboard) },
      { path: 'hero', loadComponent: () => import('./admin/pages/edit-hero/edit-hero').then(m => m.EditHero) },
      { path: 'about', loadComponent: () => import('./admin/pages/edit-about/edit-about').then(m => m.EditAbout) },
      { path: 'stats', loadComponent: () => import('./admin/pages/edit-stats/edit-stats').then(m => m.EditStats) },
      { path: 'skills', loadComponent: () => import('./admin/pages/edit-skills/edit-skills').then(m => m.EditSkills) },
      { path: 'portfolio', loadComponent: () => import('./admin/pages/edit-portfolio/edit-portfolio').then(m => m.EditPortfolio) },
      { path: 'services', loadComponent: () => import('./admin/pages/edit-services/edit-services').then(m => m.EditServices) },
      { path: 'testimonials', loadComponent: () => import('./admin/pages/edit-testimonials/edit-testimonials').then(m => m.EditTestimonials) },
      { path: 'contact', loadComponent: () => import('./admin/pages/edit-contact/edit-contact').then(m => m.EditContact) },
      { path: 'header-footer', loadComponent: () => import('./admin/pages/edit-header-footer/edit-header-footer').then(m => m.EditHeaderFooter) },
    ]
  },
  { path: '**', redirectTo: '' }
];
