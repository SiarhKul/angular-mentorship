import {Component} from '@angular/core';
import {
  MoneyAccounts
} from "../../features/money-accounts/components/money-accounts";

@Component({
  selector: 'app-categories',
  imports: [
    MoneyAccounts],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

}
