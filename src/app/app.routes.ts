import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tours',
    pathMatch: 'full',
  },
  {
    path: 'tours',
    loadComponent: () =>
      import('./pages/tours/tours.page').then((m) => m.ToursPage),
  },
  {
    path: 'tour-details/:id',
    loadComponent: () =>
      import('./pages/tour-details/tour-details.page').then((m) => m.TourDetailsPage),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./pages/favorites/favorites.page').then((m) => m.FavoritesPage),
  },
];