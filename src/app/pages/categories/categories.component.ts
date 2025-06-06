import {Component} from '@angular/core';
import {
  AccountMoneyService
} from "../../features/money-accounts/services/api/account-money.service";

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  providers: [AccountMoneyService]
})
export class CategoriesComponent {

}
