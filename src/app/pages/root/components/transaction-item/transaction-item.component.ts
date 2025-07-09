import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.css'],
  imports: [CurrencyPipe],
})
export class TransactionItemComponent {
  @Input() title = '';
  @Input() amount = 0;
  @Input() date = '';
  @Input() category = '';
  @Input() payee = '';
}
