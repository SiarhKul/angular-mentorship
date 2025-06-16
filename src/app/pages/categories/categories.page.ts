import { Component } from '@angular/core';
import { AccountMoneyService } from '../../features/money-accounts/services/api/account-money.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoriesComponent } from '../../features/categories/categories.component';

@Component({
  selector: 'app-categories-page',
  imports: [
    FormsModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    CategoriesComponent,
  ],
  templateUrl: './categories.page.html',
  styleUrl: './categories.page.css',
  providers: [AccountMoneyService],
})
export class CategoriesPage {}
