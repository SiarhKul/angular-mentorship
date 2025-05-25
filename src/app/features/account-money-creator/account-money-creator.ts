import {Component, ViewChild} from "@angular/core";
import {DrawerComponent} from "../../shared/components/drawer/drawer.component";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, NgForm} from "@angular/forms";
import {MatInput, MatLabel} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
  standalone: true,
  selector: 'account-money-creator',
  imports: [
    DrawerComponent,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInput,
    MatLabel
  ],
  styleUrls: ['account-money-creator.css'],
  template:
    `
      <app-drawer [textHeader]="'Create money account'">
        <div ngProjectAs="drawer__content">
          <form
              #createMoneyAccountRef='ngForm'
              (ngSubmit)="onSubmit()">
            <mat-form-field
                appearance='outline'
                class='mat-form-field'
            >
              <mat-label>Username</mat-label>
              <input [(ngModel)]='model.account'
                     autocomplete='account'
                     matInput
                     name='account'
                     required
                     type='text'
              >
              <mat-error>
                Username is required
              </mat-error>
            </mat-form-field>
          </form>
        </div>
        {{ model }}

        <div ngProjectAs="footer__buttons">
          <button
              mat-stroked-button
              type="submit"
          >
            Save
          </button>
        </div>
      </app-drawer>
    `
})
export class AccountMoneyCreator {
  model = {
    account: "",
  };
  @ViewChild('createMoneyAccountRef')
  createMoneyAccountRef!: NgForm

  onSubmit() {
    console.log(this.createMoneyAccountRef);
  }
}
