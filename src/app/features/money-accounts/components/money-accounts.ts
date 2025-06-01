import {Component, ViewChild} from "@angular/core";
import {AccountMoneyCards} from "./account-money-cards/account-money-cards";
import {
  AccountMoneyCreator
} from "./account-money-creator/account-money-creator";

@Component({
  selector: "money-accounts",
  standalone: true,
  styleUrl: "./money-accounts.css",
  imports: [
    AccountMoneyCards,
    AccountMoneyCreator
  ],
  template: `
    <div>
      <account-money-creator [cardsComponent]="accountMoneyCards"/>
      <account-money-cards #accountMoneyCards/>
    </div>

  `
})
export class MoneyAccounts {


  @ViewChild(AccountMoneyCards) accountMoneyCards!: AccountMoneyCards;
}
