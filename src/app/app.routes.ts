import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { ObligatoryComponent } from './obligatory/obligatory.component';
import { StatisticComponent } from './statistic/statistic.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: 'obligatory', component: ObligatoryComponent },
  { path: 'statistic', component: StatisticComponent },
  { path: 'admin', component: AdminComponent },
  { path: '', redirectTo: 'categories', pathMatch: 'full' }
];
