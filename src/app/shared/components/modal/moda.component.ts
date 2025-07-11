import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-modal',
  styleUrls: ['./modal.component.css'],
  template: `
    <div class="modal">
      <div class="modal__content">
        <div class="modal__header">
          <h2>Transaction Information</h2>
          <div class="actions">
            <button title="Edit">✏️</button>
            <button title="Delete">🗑️</button>
            <button title="Close">❌</button>
          </div>
        </div>

        <div class="modal__body">
          <div class="body-type">
            <span class="icon">⬆️</span>
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
        <div class="modal__footer"></div>
      </div>
      <div class="modal__overlay"></div>
    </div>
  `,
  imports: [CurrencyPipe],
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
}
