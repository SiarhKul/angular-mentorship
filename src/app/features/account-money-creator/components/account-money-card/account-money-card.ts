import {Component} from '@angular/core'
import {AccountMoneyService} from "../../services/api/account-money.service";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";


const CURRENCIES_DICTIONARY: Record<string, string> = {
  'dollar': '$',
  'euro': '€'
}

@Component({
  selector: 'account-money-card',
  standalone: true,
  styleUrls: ['account-money-card.css'],
  imports: [
    AsyncPipe
  ],
  template: `

    @if (moneyAccounts$ | async; as accounts) {
      <ul>
        @for (account of accounts; track account.currency) {

          <div class="account-money-card">
            <div class="card-summary">
              <span class="card-title">{{ account.typeCard }}</span>
              <span
                  class="currency">{{ CURRENCIES_DICTIONARY[account.currency] }}</span>
            </div>
            <span class="card-sum">{{ account.initSum }}</span>
            {{ account.currency }}
          </div>

        }
      </ul>
    } @else {
      <p>Загрузка...</p>
    }

  `
})
export class AccountMoneyCard {
  moneyAccounts$: Observable<any[]>;
  protected readonly CURRENCIES_DICTIONARY = CURRENCIES_DICTIONARY;

  constructor(private ams: AccountMoneyService) {
    this.moneyAccounts$ = this.ams.getMoneyAccounts()
  }
}
