import { Component, signal } from '@angular/core';
import { AccountMoneyCards } from './components/account-money-cards/account-money-cards';
import { AccountMoneyCreator } from './components/account-money-creator/account-money-creator';
import { AccountMoney } from './services/models/AccountMoney';
import { Observable } from 'rxjs';
import { AccountMoneyServiceApi } from './services/api/account-money-service-api.service';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { RoutePaths } from '../../shared/constants/route-pathes';
import { RootService } from '../../pages/root/root.service';

@Component({
  selector: 'money-accounts',
  standalone: true,
  styleUrl: './money-accounts.css',
  imports: [AccountMoneyCards, AccountMoneyCreator, AsyncPipe],
  template: `
    <div>
      <account-money-creator (onCreate)="createSuccessfully($event)" />
      <account-money-cards
        [moneyAccounts]="moneyAccounts$ | async"
        [selectedMoneyAccountIdSignal]="selectedMoneyAccountIdSignal"
      />
    </div>
  `,
})
export class MoneyAccounts {
  moneyAccounts$: Observable<Required<AccountMoney>[]> | null = null;
  selectedMoneyAccountIdSignal = signal<number | null>(null);

  constructor(
    private ams: AccountMoneyServiceApi,
    private router: Router,
    private rootService: RootService,
  ) {
    this.moneyAccounts$ = this.rootService.getMoneyAccounts();
    // this.moneyAccounts$ = this.ams.getMoneyAccounts();
  }

  async createSuccessfully(moneyAccount: number | null) {
    if (moneyAccount === null) {
      return;
    }

    this.moneyAccounts$ = this.ams.getMoneyAccounts();

    this.selectedMoneyAccountIdSignal.set(moneyAccount);

    await this.router.navigate([`/${RoutePaths.ROOT}`], {
      queryParams: {
        moneyAccountId: moneyAccount,
      },
    });
  }
}
