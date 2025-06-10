import {Component} from '@angular/core';
import {
  AccountMoneyService
} from "../../features/money-accounts/services/api/account-money.service";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {
  CategoriesCreator
} from "../../features/categories/components/categories-creator/categories-creator";
import {
  CategoriesListCtrl
} from "../../features/categories/components/categories-list/categories-list";

@Component({
  selector: 'app-categories',
  imports: [
    FormsModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    CategoriesCreator,
    CategoriesListCtrl
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  providers: [AccountMoneyService]
})
export class CategoriesComponent {
}
