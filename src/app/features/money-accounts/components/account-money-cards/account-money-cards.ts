import {Component, Input} from '@angular/core'
import {AccountMoneyService} from "../../services/api/account-money.service";
import {AccountMoney} from "../../services/models/AccountMoney";
import {NgClass} from "@angular/common";


const CURRENCIES_DICTIONARY: Record<string, string> = {
  'dollar': '$',
  'euro': '€'
}

@Component({
  selector: 'account-money-cards',
  standalone: true,
  styleUrls: ['account-money-cards.css'],
  imports: [
    NgClass
  ],
  providers: [AccountMoneyService],
  template: `
    @if (moneyAccounts; as accounts) {
      <ul class="account-money-cards">
        @for (account of accounts; track account.currency) {
          <li class="account-money-card"
              (click)="setSelectedMoneyAccount(account.id)"
              [ngClass]="{'account-money-card--highlight': selectedMoneyAccountId === account.id}"
          >
            <div class="card-summary">
              <span class="card-title">{{ account.typeCard }}</span>
              <span
                  class="currency">{{ CURRENCIES_DICTIONARY[account.currency] }}</span>
            </div>
            <span class="card-sum">{{ account.initSum }}</span>
            {{ account.currency }}
          </li>
        }
      </ul>
    } @else {
      <p>Loading...</p>
    }
  `
})
export class AccountMoneyCards {
  @Input()
  moneyAccounts: Required<AccountMoney>[] | null = null;

  @Input()
  selectedMoneyAccountId: number | null = null;
  protected readonly CURRENCIES_DICTIONARY = CURRENCIES_DICTIONARY;

  @Input()
  setSelectedMoneyAccount(selectedMoneyAccountId: number): void {
    this.selectedMoneyAccountId = selectedMoneyAccountId;
  }

}
