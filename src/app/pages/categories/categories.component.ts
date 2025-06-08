import {Component} from '@angular/core';
import {
  AccountMoneyService
} from "../../features/money-accounts/services/api/account-money.service";
import {DrawerComponent} from "../../shared/components/drawer/drawer.component";
import {FormsModule} from "@angular/forms";
import {ButtonComponent} from "../../shared/components/button/button.component";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-categories',
  imports: [
    DrawerComponent,
    FormsModule,
    ButtonComponent,
    ButtonComponent,
    ButtonComponent,
    ButtonComponent,
    MatButton,

  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  providers: [AccountMoneyService]
})
export class CategoriesComponent {

}
