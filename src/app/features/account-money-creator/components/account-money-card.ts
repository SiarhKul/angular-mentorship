import {Component} from '@angular/core'

@Component({
  selector: 'account-money-card',
  standalone: true,
  styleUrls: ['account-money-card.css'],
  template: `
    <div class="account-money-card">
      <div class="card-summary">
        <span class="card-title">Debit card</span>
        <span class="currency">$</span>
      </div>
      <span class="card-sum">123456</span>
    </div>

  `
})
export class AccountMoneyCard {
  constructor() {
  }
}
