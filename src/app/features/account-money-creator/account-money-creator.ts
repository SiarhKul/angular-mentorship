import {Component} from "@angular/core";
import {DrawerComponent} from "../../shared/components/drawer/drawer.component";
import {MatButtonModule} from "@angular/material/button";

@Component({
  standalone: true,
  selector: 'account-money-creator',
  imports: [DrawerComponent, MatButtonModule],
  styleUrls: ['account-money-creator.css'],
  template:
    `
      <app-drawer [textHeader]="'Create money account'">
        <div ngProjectAs="drawer__content">
          Test content
        </div>
        <div ngProjectAs="footer__buttons">
          <button mat-stroked-button>Save</button>
        </div>
      </app-drawer>
    `
})
export class AccountMoneyCreator {
}
