import {Component} from '@angular/core'
import {AccountMoneyService} from "../../services/api/account-money.service";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";


const CURRENCIES_DICTIONARY: Record<string, string> = {
  'dollar': '$',
  'euro': '€'
}

@Component({
  selector: 'account-money-cards',
  standalone: true,
  styleUrls: ['account-money-cards.css'],
  imports: [
    AsyncPipe
  ],
  template: `
    @if (moneyAccounts$ | async; as accounts) {
      <ul class="account-money-cards">
        @for (account of accounts; track account.currency) {
          <li class="account-money-card">
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
      <p>Загрузка...</p>
    }
  `
})
export class AccountMoneyCards {
  moneyAccounts$: Observable<any[]>;
  protected readonly CURRENCIES_DICTIONARY = CURRENCIES_DICTIONARY;

  constructor(private ams: AccountMoneyService) {
    this.moneyAccounts$ = this.ams.getMoneyAccounts()
  }
}
