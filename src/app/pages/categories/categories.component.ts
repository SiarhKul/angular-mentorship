import {Component} from '@angular/core';
import {
  MoneyAccountList
} from "../../features/account-money-creator/components/money-account-list/money-account-list";

@Component({
  selector: 'app-categories',
  imports: [
    MoneyAccountList
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

}
