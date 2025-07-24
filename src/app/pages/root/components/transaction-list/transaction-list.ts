import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { RootService } from '../../root.service';
import { TransactionItemComponent } from '../transaction-item/transaction-item.component';
import { ECategories } from '../../../../features/categories/types/enums';
import { ModalComponent } from '../../../../shared/components/modal/moda.component';
import { ITransaction } from '../../types/interfaces';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TransactionCreatorComponent } from '../transaction-creator/transaction-creator';
import { IonResponseCallbacks } from '../../../../shared/types/types';

@Component({
  standalone: true,
  selector: 'app-transaction-list',
  styleUrl: './transaction-list.css',
  imports: [
    TransactionItemComponent,
    ModalComponent,
    MatIconButton,
    MatIcon,
    TransactionCreatorComponent,
    MatButtonModule,
  ],
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
        <button mat-icon-button (click)="openDrawer()">
          <mat-icon>edit</mat-icon>
        </button>

        <button mat-icon-button (click)="deleteTransaction()">
          <mat-icon>delete</mat-icon>
        </button>
      </app-modal>

      @if (modalComponent) {
        <app-transaction-creator
          [initFormValues]="modalComponent.transactionSignal()"
          [submitAction]="updateTransactionAction.bind(this)"
        >
          <div #updateTrigger ngProjectAs="alternative__trigger"></div>
        </app-transaction-creator>
      }
    </div>
  `,
})
export class TransactionList {
  transactionsSignal = signal<any>([]);

  ECategories = ECategories;

  @ViewChild(ModalComponent)
  modalComponent!: ModalComponent;

  @ViewChild('updateTrigger', { read: ElementRef })
  updateTrigger!: ElementRef;

  constructor(private rootService: RootService) {
    this.transactionsSignal = this.rootService.transactionsSignal;
  }

  updateTransactionAction(
    values: Required<ITransaction>,
    callbacks: IonResponseCallbacks,
  ) {
    const currentTransaction = this.modalComponent.transactionSignal();
    if (currentTransaction) {
      this.rootService.updateTransaction(currentTransaction.id, values);
      callbacks.onSuccess?.(null);
    }
  }

  openDrawer() {
    this.modalComponent.toggleModal();
    this.updateTrigger.nativeElement.click();
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
