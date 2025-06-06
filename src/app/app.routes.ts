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
import {AuthGuard} from "./features/auth/services/auth.server";

const mainRoutes: Routes = [
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subscriptions',
    component: SubscriptionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'obligatory',
    component: ObligatoryComponent,
    canActivate: [AuthGuard]
  },
  {path: 'statistic', component: StatisticComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
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
