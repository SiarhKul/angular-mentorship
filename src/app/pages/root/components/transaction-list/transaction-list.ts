import { Component, signal, ViewChild } from '@angular/core';
import { RootService } from '../../root.service';
import { TransactionItemComponent } from '../transaction-item/transaction-item.component';
import { ECategories } from '../../../../features/categories/types/enums';
import { ModalComponent } from '../../../../shared/components/modal/moda.component';
import { ITransaction } from '../../types/interfaces';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TUUID } from '../../../../shared/types/types';

@Component({
  standalone: true,
  selector: 'app-transaction-list',
  styleUrl: './transaction-list.css',
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
        <button mat-icon-button>
          <mat-icon>edit</mat-icon>
        </button>
        <button mat-icon-button>
          <mat-icon>delete</mat-icon>
        </button>
      </app-modal>
    </div>
  `,
  imports: [TransactionItemComponent, ModalComponent, MatIconButton, MatIcon],
})
export class TransactionList {
  transactionsSignal = signal<any>([]);

  @ViewChild(ModalComponent)
  modalComponent!: ModalComponent;
  ECategories = ECategories;

  constructor(private rootService: RootService) {
    this.transactionsSignal = this.rootService.transactionsSignal;
  }

  deleteTransaction(id: TUUID) {
    this.rootService.deleteTransaction(id);
  }

  showTransaction(tx: Required<ITransaction>) {
    this.modalComponent.showTransaction(tx);
  }
}
