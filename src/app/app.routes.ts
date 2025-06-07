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
import {RoutePaths} from "./shared/constants/route-pathes";

const mainRoutes: Routes = [
  {
    path: RoutePaths.CATEGORIES,
    component: CategoriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: RoutePaths.SUBSCRIPTIONS,
    component: SubscriptionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: RoutePaths.OBLIGATORY,
    component: ObligatoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: RoutePaths.STATISTIC,
    component: StatisticComponent,
    canActivate: [AuthGuard]
  },
  {path: RoutePaths.ADMIN, component: AdminComponent, canActivate: [AuthGuard]},
  {path: RoutePaths.ROOT, redirectTo: RoutePaths.CATEGORIES, pathMatch: 'full'}
];

const authRoutes: Routes = [
  {path: RoutePaths.LOGIN, component: LoginComponent},
  {path: RoutePaths.ROOT, redirectTo: RoutePaths.LOGIN, pathMatch: 'full'}
];

export const routes: Routes = [
  {path: RoutePaths.ROOT, component: MainLayout, children: mainRoutes},
  {path: RoutePaths.AUTH, component: AuthLayout, children: authRoutes},
  {path: RoutePaths.LANDING, component: LandingLayout},
];
