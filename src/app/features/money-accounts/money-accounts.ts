import { Component, signal } from '@angular/core';
import { AccountMoneyCards } from './components/account-money-cards/account-money-cards';
import { AccountMoneyCreator } from './components/account-money-creator/account-money-creator';
import { AccountMoney } from './services/models/AccountMoney';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
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

  constructor(private rootService: RootService) {
    this.moneyAccounts$ = this.rootService.getMoneyAccounts();
  }

  async createSuccessfully(moneyAccount: number | null) {
    await this.rootService.createSuccessfully(moneyAccount);
  }
}
