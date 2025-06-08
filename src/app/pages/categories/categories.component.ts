import {Component} from '@angular/core';
import {
  AccountMoneyService
} from "../../features/money-accounts/services/api/account-money.service";
import {DrawerComponent} from "../../shared/components/drawer/drawer.component";
import {FormsModule} from "@angular/forms";
import {ButtonComponent} from "../../shared/components/button/button.component";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect, MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {NgStyle} from "@angular/common";

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
    MatInput,
    MatLabel,
    MatFormField,
    MatOption,
    MatSelect,
    DrawerComponent,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInput,
    MatLabel,
    MatSelectModule,
    NgStyle
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  providers: [AccountMoneyService]
})
export class CategoriesComponent {
  model = {
    name: '',
    category: 1,  // Default to first category ID
  }

  categories = [
    {category: "Income", id: 1},
    {category: "Expanses", id: 2},
  ]


  onSubmit() {

  }
}
