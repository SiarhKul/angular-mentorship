import {Component} from '@angular/core';
import {
  AccountMoneyCreator
} from "../../features/account-money-creator/account-money-creator";
import {
  AccountMoneyCard
} from "../../features/account-money-creator/components/account-money-card";

@Component({
  selector: 'app-categories',
  imports: [
    AccountMoneyCreator,
    AccountMoneyCard
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

}
