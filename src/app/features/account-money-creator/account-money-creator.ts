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
              id="create-money-account"
              #createMoneyAccountRef='ngForm'
              (ngSubmit)="onSubmit()">
            <mat-form-field
                appearance='outline'
                class='mat-form-field'
            >
              <mat-label>Account Name</mat-label>
              <input
                  [(ngModel)]='model.account'
                  autocomplete='account'
                  matInput
                  name='accountcreate'
                  required
                  type='text'
              >
              <mat-error>
                Account name is required
              </mat-error>
            </mat-form-field>
          </form>
        </div>

        <div ngProjectAs="footer__buttons">
          <button
              mat-stroked-button
              form="create-money-account"
              type="submit"
              [disabled]="createMoneyAccountRef.invalid"
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
    if (this.createMoneyAccountRef.valid) {
      console.log('Form submitted with value:', this.model);
      this.createMoneyAccountRef.resetForm();
    }
  }
}
