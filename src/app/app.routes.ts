import {Routes} from '@angular/router';
import {CategoriesComponent} from './pages/categories/categories.component';
import {
  SubscriptionsComponent
} from './pages/subscriptions/subscriptions.component';
import {ObligatoryComponent} from './pages/obligatory/obligatory.component';
import {StatisticComponent} from './pages/statistic/statistic.component';
import {AdminComponent} from './pages/admin/admin.component';
import {LoginComponent} from "./features/auth/components/login/login.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'categories', component: CategoriesComponent},
  // на роуты можно добавить guard, чтобы закрыть их для доступа не залогиненому юзеру
  // Можно еще сделать немного другую структуру, чтобы все роуты (ну или за исключением логина) приложения были как child под одним родительским mainLayout например (в нём будет хедер и <router-outlet />)
  // + добавить лейзи лоадинг (loadComponent), но это всё уже задача со *
  {path: 'subscriptions', component: SubscriptionsComponent},
  {path: 'obligatory', component: ObligatoryComponent},
  {path: 'statistic', component: StatisticComponent},
  {path: 'admin', component: AdminComponent},
  {path: '', redirectTo: 'categories', pathMatch: 'full'}
];
