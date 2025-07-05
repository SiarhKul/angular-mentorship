import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountMoney } from '../models/AccountMoney';
import { ACCOUNT_MONEY_ENDPOINT } from '../../../../shared/constants/endpoints';
import { API_URLS } from '../../../../shared/constants/api-url';

//todo: Mentor: Why is @Injectable used here?
@Injectable({
  providedIn: 'root',
})
export class AccountMoneyServiceApi {
  constructor(private http: HttpClient) {}

  create(moneyAccount: AccountMoney) {
    const url = `${API_URLS.baseUrl}${ACCOUNT_MONEY_ENDPOINT.moneyAccount}`;
    return this.http.post<Required<AccountMoney>>(url, moneyAccount);
  }

  getMoneyAccounts() {
    const url = `${API_URLS.baseUrl}${ACCOUNT_MONEY_ENDPOINT.moneyAccount}`;
    return this.http.get<Required<AccountMoney>[]>(url);
  }
}
