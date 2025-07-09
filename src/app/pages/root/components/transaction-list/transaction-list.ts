import { Component, signal } from '@angular/core';
import { RootService } from '../../root.service';
import { TransactionItemComponent } from '../transaction-item/transaction-item.component';
import { ECategories } from '../../../../features/categories/types/enums';

@Component({
  standalone: true,
  selector: 'app-transaction-list',
  styleUrl: './transaction-list.css',
  template: `
    <div class="transaction-list">
      @for (tx of transactionsSignal(); track tx.id) {
        <app-transaction-item
          [title]="tx.title"
          [amount]="tx.amount"
          [date]="tx.date"
          [category]="tx.category"
          [payee]="tx.payee"
          [description]="tx.description"
          [isIncome]="tx.category === ECategories.INCOME"
        >
        </app-transaction-item>
      }
    </div>
  `,
  imports: [TransactionItemComponent],
})
export class TransactionList {
  transactionsSignal = signal<any>([]);
  constructor(private rootService: RootService) {
    this.transactionsSignal = this.rootService.transactionsSignal;
  }

  protected readonly ECategories = ECategories;
}
