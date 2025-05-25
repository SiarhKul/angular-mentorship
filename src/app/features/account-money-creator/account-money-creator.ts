import {Component} from "@angular/core";
import {DrawerComponent} from "../../shared/components/drawer/drawer.component";

@Component({
  standalone: true,
  selector: 'account-money-creator',
  imports: [DrawerComponent],
  styleUrls: ['account-money-creator.css'],
  template:
    `
      <app-drawer [textHeader]="'Create money account'">
        Test content
      </app-drawer>
    `
})
export class AccountMoneyCreator {
}
