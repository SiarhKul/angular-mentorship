import { Injectable, signal } from '@angular/core';
import { AccountMoneyServiceApi } from '../../features/money-accounts/services/api/account-money-service-api.service';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { AccountMoney } from '../../features/money-accounts/services/models/AccountMoney';
import { RoutePaths } from '../../shared/constants/route-pathes';
import { HttpClient } from '@angular/common/http';
import { TransactionServiceApi } from './services/transaction.service.api';
import { IOnSubscriptionCallbacks } from '../../shared/types/interfaces';
import { ITransaction } from './types/interfaces';
import { TUUID } from '../../shared/types/types';

//todo: Mentor: Why is @Injectable used here?
@Injectable({
  providedIn: 'root',
  useFactory: (http: HttpClient, router: Router) => {
    const amsApi = new AccountMoneyServiceApi(http);
    const tsApi = new TransactionServiceApi(http);
    return new RootService(amsApi, tsApi, router);
  },
  deps: [HttpClient, Router],
})
export class RootService {
  moneyAccounts$: Observable<Required<AccountMoney>[]> | null = null;
  selectedMoneyAccountIdSignal = signal<number | null>(null);
  transactionsSignal = signal<any>([]);

  constructor(
    private accountMoneyServiceApi: AccountMoneyServiceApi,
    private transactionServiceApi: TransactionServiceApi,
    private router: Router,
  ) {
    this.fetchTransactions();
  }

  getMoneyAccounts() {
    return this.accountMoneyServiceApi.getMoneyAccounts();
  }

  fetchTransactions() {
    return this.transactionServiceApi.getTransactions().subscribe({
      next: (transactions) => {
        this.transactionsSignal.set(transactions);
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      },
    });
  }

  async createTransactionAsync(
    transaction: ITransaction,
    { onSuccess }: IOnSubscriptionCallbacks,
  ) {
    this.transactionServiceApi
      .createTransaction(transaction)
      .pipe(
        switchMap(() => {
          return this.transactionServiceApi.getTransactions();
        }),
      )
      .subscribe({
        next: (transactions) => {
          this.transactionsSignal.set(transactions);
          onSuccess?.();
        },
        error: (error) => {
          console.error('Error creating transaction:', error);
        },
      });
  }

  async createSuccessfully(moneyAccount: number | null) {
    if (moneyAccount === null) {
      return;
    }

    this.moneyAccounts$ = this.accountMoneyServiceApi.getMoneyAccounts();

    this.selectedMoneyAccountIdSignal.set(moneyAccount);

    await this.router.navigate([`/${RoutePaths.ROOT}`], {
      queryParams: {
        moneyAccountId: moneyAccount,
      },
    });
  }

  deleteTransaction(id: TUUID) {
    this.transactionServiceApi
      .delete(id)
      .pipe(switchMap(() => this.transactionServiceApi.getTransactions()))
      .subscribe({
        next: (transactions) => {
          this.transactionsSignal.set(transactions);
        },
        error: (error) => {
          console.error('Error deleting transaction:', error);
        },
      });
  }
}
