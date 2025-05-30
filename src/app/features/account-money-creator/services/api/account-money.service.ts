import {HttpClient} from "@angular/common/http";
import {AccountMoney} from "../models/AccountMoney";
import {ACCOUNT_MONEY_ENDPOINT} from "../../../../shared/constants/endpoints";
import {API_URLS} from "../../../../shared/constants/api-url";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountMoneyService {
  constructor(private http: HttpClient) {
  }

  create(moneyAccount: AccountMoney) {
    const url = `${API_URLS.baseUrl}${ACCOUNT_MONEY_ENDPOINT.moneyAccount}`
    return this.http.post(url, moneyAccount)
  }

  getMoneyAccounts(): Observable<any[]> {
    const url = 'get moneyAccounts';
    console.log(url)

    const dummyAccounts: AccountMoney[] = [
      new AccountMoney('dollar', 'Visa', 1000),
      new AccountMoney('euro', 'MasterCard', 2000)
    ];
    return of(dummyAccounts);

  }
}
