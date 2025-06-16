import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { AccountMoneyService } from '../../services/api/account-money.service';
import { AccountMoney } from '../../services/models/AccountMoney';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePaths } from '../../../../shared/constants/route-pathes';

const CURRENCIES_DICTIONARY: Record<string, string> = {
  dollar: '$',
  euro: '€',
};

@Component({
  selector: 'account-money-cards',
  standalone: true,
  styleUrls: ['account-money-cards.css'],
  imports: [NgClass],
  providers: [AccountMoneyService],
  template: `
    @if (moneyAccounts; as accounts) {
      <ul class="account-money-cards">
        @for (account of accounts; track account.currency + $index) {
          <li
            class="account-money-card"
            (click)="setSelectedMoneyAccount(account.id)"
            [ngClass]="{
              'account-money-card--highlight': selectedMoneyAccountIdSignal
                ? selectedMoneyAccountIdSignal() === account.id
                : false,
            }"
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
  `,
})
export class AccountMoneyCards implements OnChanges {
  @Input()
  selectedMoneyAccountIdSignal: WritableSignal<number | null> | null = null;
  @Input()
  moneyAccounts: Required<AccountMoney>[] | null = null;
  protected readonly CURRENCIES_DICTIONARY = CURRENCIES_DICTIONARY;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['moneyAccounts'] && this.moneyAccounts?.length) {
      const moneyAccountId =
        this.activeRoute.snapshot.queryParamMap.get('moneyAccountId');
      const firstElement = this.moneyAccounts[0];

      if (moneyAccountId === null && firstElement) {
        this.selectedMoneyAccountIdSignal?.set(firstElement.id);
      } else {
        this.selectedMoneyAccountIdSignal?.set(Number(moneyAccountId));
      }
    }
  }

  async setSelectedMoneyAccount(selectedMoneyAccountId: number) {
    this.selectedMoneyAccountIdSignal?.set(selectedMoneyAccountId);
    await this.router.navigate([`/${RoutePaths.ROOT}`], {
      queryParams: {
        moneyAccountId: selectedMoneyAccountId,
      },
    });
  }
}
