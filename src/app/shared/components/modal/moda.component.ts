import { Component, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CategoryTypeComponent } from '../category-type/category-type.component';

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

          <div class="modal__body">
            <div class="body-type">
              <app-category-type [isIncome]="isIncome" />
              <span>{{ transaction.type }}</span>
            </div>

            <h3>{{ transaction.descriptionShort }}</h3>

            <div class="category-buttons">
              <button class="outlined">{{ transaction.subcategory }}</button>
              <button class="outlined">{{ transaction.category }}</button>
            </div>

            <div class="amount">
              {{ transaction.amount | currency: transaction.currency : true }}
            </div>

            <div class="details">
              <div>
                <strong>Payment Date:</strong> {{ transaction.paymentDate }}
              </div>
              <hr />
              <div><strong>Payee:</strong> {{ transaction.payee }}</div>
              <hr />
              <div>
                <strong>Description:</strong> {{ transaction.descriptionFull }}
              </div>
            </div>
          </div>
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

  isOpenSignal = signal(true);

  toggleModal() {
    this.isOpenSignal.set(!this.isOpenSignal());
  }
}
