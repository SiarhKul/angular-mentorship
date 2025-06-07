import {Component} from "@angular/core";
import {AccountMoneyCards} from "./account-money-cards/account-money-cards";
import {
  AccountMoneyCreator
} from "./account-money-creator/account-money-creator";
import {AccountMoney} from "../services/models/AccountMoney";
import {Observable} from "rxjs";
import {AccountMoneyService} from "../services/api/account-money.service";
import {AsyncPipe} from "@angular/common";

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
        <account-money-creator (createSucced)="onCreateSuccess($event)"/>
        <account-money-cards [moneyAccounts]="moneyAccounts$ | async"/>
      </div>
    `
})
export class MoneyAccounts {
  moneyAccounts$: Observable<Required<AccountMoney>[]> | null = null;

  constructor(private ams: AccountMoneyService) {
    this.moneyAccounts$ = this.ams.getMoneyAccounts();
  }

  onCreateSuccess(flag: boolean) {
    if (!flag) {
      console.log("show error message")
    }
    this.moneyAccounts$ = this.ams.getMoneyAccounts();
  };
}
