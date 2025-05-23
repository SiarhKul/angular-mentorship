import { Routes } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';
import { ObligatoryComponent } from './pages/obligatory/obligatory.component';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'categories', component: CategoriesComponent  },
  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: 'obligatory', component: ObligatoryComponent },
  { path: 'statistic', component: StatisticComponent },
  { path: 'admin', component: AdminComponent },
  { path: '', redirectTo: 'categories', pathMatch: 'full' }
];
