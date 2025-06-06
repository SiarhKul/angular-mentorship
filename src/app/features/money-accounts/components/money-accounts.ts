import { Component, signal } from '@angular/core';
import { AccountMoneyCards } from './account-money-cards/account-money-cards';
import { AccountMoneyCreator } from './account-money-creator/account-money-creator';
import { AccountMoney } from '../services/models/AccountMoney';
import { catchError, EMPTY, finalize, Observable, switchMap, tap } from 'rxjs';
import { AccountMoneyService } from '../services/api/account-money.service';

@Component({
  selector: 'money-accounts',
  standalone: true,
  styleUrl: './money-accounts.css',
  imports: [AccountMoneyCards, AccountMoneyCreator],
  template: `
    <div>
      <account-money-creator
        [loading]="loadingSignal()"
        (submitClicked)="onSubmitClicked($event)"
      />
      <account-money-cards [moneyAccounts]="moneyAccountsSignal()" />
    </div>
  `,
})
export class MoneyAccounts {
  moneyAccountsSignal = signal<AccountMoney[]>([]);
  loadingSignal = signal(false);

  constructor(private ams: AccountMoneyService) {
    this.updateMoneyAccounts();
  }

  public onSubmitClicked(newAccount: AccountMoney): void {
    // Пример варианта как это можно было сделать в одном смарт компоненте, используя rxjs ну и сигналы (но можно и обсерваблы)
    this.loadingSignal.set(true);
    this.ams
      .create(newAccount)
      .pipe(
        catchError((error) => {
          console.log('error', error);
          return EMPTY;
        }),
        finalize(() => {
          this.loadingSignal.set(false);
        }),
        switchMap(() => this.ams.getMoneyAccounts())
      )
      .subscribe((moneyAccounts: AccountMoney[]) => {
        this.moneyAccountsSignal.set(moneyAccounts);
      });
  }

  private updateMoneyAccounts(): void {
    this.ams.getMoneyAccounts().subscribe((moneyAccounts: AccountMoney[]) => {
      this.moneyAccountsSignal.set(moneyAccounts);
    });
  }
}
