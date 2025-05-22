import { Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { ObligatoryComponent } from './components/obligatory/obligatory.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'categories', component: CategoriesComponent  },
  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: 'obligatory', component: ObligatoryComponent },
  { path: 'statistic', component: StatisticComponent },
  { path: 'admin', component: AdminComponent },
  { path: '', redirectTo: 'categories', pathMatch: 'full' }
];
