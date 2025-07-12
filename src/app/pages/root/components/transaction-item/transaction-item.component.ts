import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CategoryTypeComponent } from '../../../../shared/components/category-type/category-type.component';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.css'],
  imports: [CurrencyPipe, MatIconModule, CategoryTypeComponent],
})
export class TransactionItemComponent {
  @Input() title = '';
  @Input() amount = 0;
  @Input() date = '';
  @Input() category = '';
  @Input() payee = '';
  @Input() description = '';
  @Input() isIncome = false;
}
