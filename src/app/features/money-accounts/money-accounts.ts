import {Component} from "@angular/core";
import {
  AccountMoneyCards
} from "./components/account-money-cards/account-money-cards";
import {
  AccountMoneyCreator
} from "./components/account-money-creator/account-money-creator";
import {AccountMoney} from "./services/models/AccountMoney";
import {Observable} from "rxjs";
import {AccountMoneyService} from "./services/api/account-money.service";
import {AsyncPipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: "money-accounts",
  standalone: true,
  styleUrl: "./money-accounts.css",
  imports: [
    AccountMoneyCards,
    AccountMoneyCreator,
    AsyncPipe
  ],
  template:
    `
      <div>
        <account-money-creator (onCreate)="createSuccessfully($event)"/>
        <account-money-cards [moneyAccounts]="moneyAccounts$ | async"/>
      </div>
    `
})
export class MoneyAccounts {
  moneyAccounts$: Observable<Required<AccountMoney>[]> | null = null;

  constructor(
    private ams: AccountMoneyService,
    private router: Router,
  ) {
    this.moneyAccounts$ = this.ams.getMoneyAccounts();
  }

  async createSuccessfully(moneyAccount: number | null) {
    if (moneyAccount === null) {
      console.log("show error message")
      return
    }
    this.moneyAccounts$ = this.ams.getMoneyAccounts();

    await this.router.navigate(['/categories'], {
      queryParams: {
        moneyAccountId: moneyAccount
      }
    });
  };
}
