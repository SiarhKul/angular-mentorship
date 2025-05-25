import {Component} from '@angular/core';
import {
  AccountMoneyCreator
} from "../../features/account-money-creator/account-money-creator";

@Component({
  selector: 'app-categories',
  imports: [
    AccountMoneyCreator,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

}
