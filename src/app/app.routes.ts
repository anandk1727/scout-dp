import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('@scout').then((m) => m.ScoutComponent) },
  {
    path: 'contact-us',
    title: 'Contact us',
    loadComponent: () => import('@contact').then((m) => m.ContactComponent),
  },
  { path: '**', redirectTo: '' },
];
