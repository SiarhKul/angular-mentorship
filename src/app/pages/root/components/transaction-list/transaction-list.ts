import { Component, signal } from '@angular/core';
import { RootService } from '../../root.service';

@Component({
  standalone: true,
  selector: 'app-transaction-list',
  styleUrl: './transaction-list.css',
  template: `
    <div class="transaction-list">
      <h2>Transaction List</h2>

      @for (transaction of transactionsSignal(); track transaction.id) {
        <div class="transaction-item">
          <p><strong>Title:</strong> {{ transaction.title }}</p>
          <p><strong>Amount:</strong> {{ transaction.amount }}</p>
          <p><strong>Category:</strong> {{ transaction.category }}</p>
        </div>
      }
      <p>List of transactions will be displayed here.</p>
    </div>
  `,
})
export class TransactionList {
  transactionsSignal = signal<any>([]);
  constructor(private rootService: RootService) {
    this.transactionsSignal = this.rootService.transactionsSignal;
  }
}
