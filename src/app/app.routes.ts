import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./components/sales-date-prediction-view/sales-date-prediction-view.component').then(c => c.SalesDatePredictionViewComponent)
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];
