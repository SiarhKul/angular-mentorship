import {Routes} from '@angular/router';
import {MainLayout} from "./layouts/main.layout";
import {AuthLayout} from "./layouts/auth.layout";
import {LandingLayout} from "./layouts/landing.layout";
import {LoginComponent} from "./features/auth/components/login/login.component";
import {CategoriesComponent} from './pages/categories/categories.component';
import {
  SubscriptionsComponent
} from './pages/subscriptions/subscriptions.component';
import {ObligatoryComponent} from "./pages/obligatory/obligatory.component";
import {StatisticComponent} from "./pages/statistic/statistic.component";
import {AdminComponent} from "./pages/admin/admin.component";

const mainRoutes: Routes = [
  {path: 'categories', component: CategoriesComponent},
  {path: 'subscriptions', component: SubscriptionsComponent},
  {path: 'obligatory', component: ObligatoryComponent},
  {path: 'statistic', component: StatisticComponent},
  {path: 'admin', component: AdminComponent},
  {path: '', redirectTo: 'categories', pathMatch: 'full'}
];

const authRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

export const routes: Routes = [
  {path: '', component: MainLayout, children: mainRoutes},
  {path: 'auth', component: AuthLayout, children: authRoutes},
  {path: 'landing', component: LandingLayout},
];
