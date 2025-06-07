import {Component} from '@angular/core';
import {MoneyAccounts} from "../../features/money-accounts/money-accounts";
import {
  AccountMoneyService
} from "../../features/money-accounts/services/api/account-money.service";

@Component({
  selector: 'app-categories',
  imports: [
    MoneyAccounts],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  providers: [AccountMoneyService]
})
export class CategoriesComponent {

}
