import {Component} from "@angular/core";
import {DrawerComponent} from "../../shared/components/drawer/drawer.component";

@Component({
  standalone: true,
  selector: 'account-money-creator',
  imports: [DrawerComponent],
  styleUrls: ['account-money-creator.css'],
  template:
    `
      <app-drawer>
        <h3>Create money account</h3>
        Test content
      </app-drawer>
    `
})
export class AccountMoneyCreator {
}
