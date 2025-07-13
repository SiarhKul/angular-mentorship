import { Component, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CategoryTypeComponent } from '../category-type/category-type.component';
import { ITransaction } from '../../../pages/root/types/interfaces';
import { ECategories } from '../../../features/categories/types/enums';

@Component({
  selector: 'app-modal',
  styleUrls: ['./modal.component.css'],
  imports: [
    CurrencyPipe,
    MatButtonModule,
    MatIconModule,
    MatIcon,
    CategoryTypeComponent,
  ],
  template: `
    @if (isOpenSignal()) {
      <div class="modal">
        <div class="modal__content">
          <div class="modal__header">
            <h2>Transaction Information</h2>
            <div class="actions">
              <button mat-icon-button>
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button>
                <mat-icon>delete</mat-icon>
              </button>
              <button mat-icon-button (click)="toggleModal()">
                <mat-icon>close</mat-icon>
              </button>
            </div>
          </div>

          @if (transactionSignal() !== null) {
            <div class="modal__body">
              <div class="transactions-type">
                <app-category-type [isIncome]="isIncome" />
                <h3>
                  {{ transactionSignal()!.category }}
                </h3>
                <span class="amount">
                  {{
                    transaction.amount | currency: transaction.currency : true
                  }}
                </span>
              </div>

              <h3>{{ transactionSignal()!.title }}</h3>

              <div class="category-buttons">
                <span class="outlined">
                  {{ transactionSignal()!.title }}
                </span>
              </div>

              <div class="details">
                <div>
                  <strong>Payment Date:</strong> {{ transactionSignal()!.date }}
                </div>
                <hr />
                <div>
                  <strong>Payee:</strong> {{ transactionSignal()!.payee }}
                </div>
                <hr />
                <div>
                  <strong>Description:</strong>
                  {{ transactionSignal()!.description }}
                </div>
              </div>
            </div>
          }

          <div class="modal__footer">
            <button class="button--cancel" (click)="toggleModal()" mat-button>
              Cancel
            </button>
          </div>
        </div>
        <div class="modal__overlay" (click)="toggleModal()"></div>
      </div>
    }
  `,
})
export class ModalComponent {
  transaction = {
    type: 'Expenses',
    category: 'Rent',
    subcategory: 'Home',
    descriptionShort: 'Flat rent for March',
    amount: -650.0,
    currency: '$',
    paymentDate: '28.02.2022',
    payee: 'John Smith',
    descriptionFull:
      'Payment for flat in Samrocka street 25. Don’t forget to send a receipt.',
  };
  isIncome = true;

  transactionSignal = signal<Required<ITransaction | null>>(null);
  isOpenSignal = signal(false);

  toggleModal() {
    this.isOpenSignal.set(!this.isOpenSignal());
  }

  showTransaction(tx: Required<ITransaction>) {
    this.transactionSignal.set(tx);
    this.isOpenSignal.set(true);
    this.isIncome = tx.category === ECategories.INCOME;
  }
}
