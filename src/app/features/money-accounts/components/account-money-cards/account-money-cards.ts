import {Component, Input, WritableSignal} from '@angular/core'
import {AccountMoneyService} from "../../services/api/account-money.service";
import {AccountMoney} from "../../services/models/AccountMoney";
import {NgClass} from "@angular/common";
import {Router} from "@angular/router";


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
        @for (account of accounts; track $index) {
          <li class="account-money-card"
              (click)="setSelectedMoneyAccount(account.id)"
              [ngClass]="{'account-money-card--highlight': selectedMoneyAccountIdSignal ? selectedMoneyAccountIdSignal() === account.id : false }"
          >
            <div class="card-summary">
              <span class="card-title">
                {{ account.typeCard }}
              </span>
              <span class="currency">
                {{ CURRENCIES_DICTIONARY[account.currency] }}
              </span>
            </div>
            <span cmoneyAccountslass="card-sum">{{ account.initSum }}</span>
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
  selectedMoneyAccountIdSignal: WritableSignal<number | null> | null = null
  @Input()
  moneyAccounts: Required<AccountMoney>[] | null = null;

  readonly CURRENCIES_DICTIONARY = CURRENCIES_DICTIONARY;

  constructor(
    private router: Router
  ) {
  }

  @Input()
  async setSelectedMoneyAccount(selectedMoneyAccountId: number) {
    this.selectedMoneyAccountIdSignal?.set(selectedMoneyAccountId);
    await this.router.navigate(['/categories'], {
      queryParams: {
        moneyAccountId: selectedMoneyAccountId
      }
    });
  }
}
