import { Component, signal, ViewChild } from '@angular/core';
import { RootService } from '../../root.service';
import { TransactionItemComponent } from '../transaction-item/transaction-item.component';
import { ECategories } from '../../../../features/categories/types/enums';
import { ModalComponent } from '../../../../shared/components/modal/moda.component';
import { ITransaction } from '../../types/interfaces';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-transaction-list',
  styleUrl: './transaction-list.css',
  imports: [TransactionItemComponent, ModalComponent, MatIconButton, MatIcon],
  template: `
    <div>
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
            (click)="showTransaction(tx)"
          >
          </app-transaction-item>
        }
      </div>
      <app-modal>
        <button mat-icon-button (click)="updateTransaction()">
          <mat-icon>edit</mat-icon>
        </button>
        <button mat-icon-button (click)="deleteTransaction()">
          <mat-icon>delete</mat-icon>
        </button>
      </app-modal>
    </div>
  `,
})
export class TransactionList {
  transactionsSignal = signal<any>([]);

  ECategories = ECategories;

  @ViewChild(ModalComponent)
  modalComponent!: ModalComponent;

  constructor(private rootService: RootService) {
    this.transactionsSignal = this.rootService.transactionsSignal;
  }

  updateTransaction() {
    const currentTransaction = this.modalComponent.transactionSignal();
    if (currentTransaction) {
      this.rootService.updateTransaction(
        currentTransaction.id,
        currentTransaction,
      );
    }
  }

  deleteTransaction() {
    const currentTransaction = this.modalComponent.transactionSignal();
    if (currentTransaction) {
      this.rootService.deleteTransaction(currentTransaction.id);
      this.modalComponent.toggleModal();
    }
  }

  showTransaction(tx: Required<ITransaction>) {
    this.modalComponent.showTransaction(tx);
  }
}
