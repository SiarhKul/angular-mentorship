import { Injectable, signal } from '@angular/core';
import { AccountMoneyServiceApi } from '../../features/money-accounts/services/api/account-money-service-api.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountMoney } from '../../features/money-accounts/services/models/AccountMoney';
import { RoutePaths } from '../../shared/constants/route-pathes';
import { HttpClient } from '@angular/common/http';

//todo: Mentor: Why is @Injectable used here?
@Injectable({
  providedIn: 'root',
  useFactory: (http: HttpClient, router: Router) =>
    new RootService(new AccountMoneyServiceApi(http), router),
  deps: [HttpClient, Router],
})
export class RootService {
  moneyAccounts$: Observable<Required<AccountMoney>[]> | null = null;
  selectedMoneyAccountIdSignal = signal<number | null>(null);

  constructor(
    private apiService: AccountMoneyServiceApi,
    private router: Router,
  ) {}

  getMoneyAccounts() {
    return this.apiService.getMoneyAccounts();
  }

  async createSuccessfully(moneyAccount: number | null) {
    if (moneyAccount === null) {
      return;
    }

    this.moneyAccounts$ = this.apiService.getMoneyAccounts();

    this.selectedMoneyAccountIdSignal.set(moneyAccount);

    await this.router.navigate([`/${RoutePaths.ROOT}`], {
      queryParams: {
        moneyAccountId: moneyAccount,
      },
    });
  }
}
