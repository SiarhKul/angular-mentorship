import { Injectable } from '@angular/core';
import { AccountMoneyServiceApi } from '../../features/money-accounts/services/api/account-money-service-api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
  useFactory: (api: AccountMoneyServiceApi, router: Router) =>
    new RootService(api, router),
  deps: [AccountMoneyServiceApi, Router],
})
class RootService {
  constructor(
    private apiService: AccountMoneyServiceApi,
    private router: Router,
  ) {}
}
