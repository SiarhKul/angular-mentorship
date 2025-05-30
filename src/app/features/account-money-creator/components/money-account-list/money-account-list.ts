import {Component} from "@angular/core";
import {AccountMoneyCard} from "../account-money-card/account-money-card";
import {AccountMoneyCreator} from "../../account-money-creator";

@Component({
  selector: "money-account-list",
  standalone: true,
  styleUrl: "./money-account-list.css",
  imports: [
    AccountMoneyCard,
    AccountMoneyCreator
  ],
  template: `
    <div>
      <account-money-creator/>

      <account-money-card/>
    </div>

  `
})
export class MoneyAccountList {

}
