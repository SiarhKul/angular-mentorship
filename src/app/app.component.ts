import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
// import { CategoriesComponent } from './categories/categories.component';
// import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
// import { ObligatoryComponent } from './obligatory/obligatory.component';
// import { StatisticComponent } from './statistic/statistic.component';
// import { AdminComponent } from './admin/admin.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    // CategoriesComponent,
    // SubscriptionsComponent,
    // ObligatoryComponent,
    // StatisticComponent,
    // AdminComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-mentorship';
}
