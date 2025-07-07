import { Injectable, signal } from '@angular/core';
import { AccountMoneyServiceApi } from '../../features/money-accounts/services/api/account-money-service-api.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountMoney } from '../../features/money-accounts/services/models/AccountMoney';
import { RoutePaths } from '../../shared/constants/route-pathes';
import { HttpClient } from '@angular/common/http';
import { TransactionServiceApi } from './services/transaction.service.api';

//todo: Mentor: Why is @Injectable used here?
@Injectable({
  providedIn: 'root',
  useFactory: (http: HttpClient, router: Router) => {
    const amsApi = new AccountMoneyServiceApi(http);
    const tApi = new TransactionServiceApi(http);

    return new RootService(amsApi, tApi, router);
  },
  deps: [HttpClient, Router],
})
export class RootService {
  moneyAccounts$: Observable<Required<AccountMoney>[]> | null = null;
  selectedMoneyAccountIdSignal = signal<number | null>(null);

  constructor(
    private accountMoneyServiceApi: AccountMoneyServiceApi,
    private transactionServiceApi: TransactionServiceApi,
    private router: Router,
  ) {}

  getMoneyAccounts() {
    return this.accountMoneyServiceApi.getMoneyAccounts();
  }

  async createTransactionAsync(transaction: any) {
    this.transactionServiceApi.createTransaction(transaction);
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
}
