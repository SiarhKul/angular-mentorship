import {Component, ViewChild} from "@angular/core";
import {DrawerComponent} from "../../shared/components/drawer/drawer.component";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, NgForm} from "@angular/forms";
import {MatInput, MatLabel} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";

@Component({
  standalone: true,
  selector: 'account-money-creator',
  styleUrls: ['account-money-creator.css'],
  imports: [
    DrawerComponent,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInput,
    MatLabel,
    MatSelectModule
  ],
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
                  [(ngModel)]='model.typeCard'
                  autocomplete='typeCard'
                  matInput
                  name='typeCard'
                  required
                  type='text'
              >
              <mat-error>
                Account name is required
              </mat-error>
            </mat-form-field>
            <mat-form-field
                appearance='outline'
                class='mat-form-field'
            >
              <mat-label>Initial summa</mat-label>
              <input
                  [(ngModel)]='model.initSum'
                  autocomplete='initSum'
                  matInput
                  name='initSum'
                  type='number'
                  min="0"

              >
            </mat-form-field>

            <mat-form-field>
              <mat-label>Select currency</mat-label>
              <mat-select>
                @for (food of foods; track food) {
                  <mat-option [value]="food.value">{{ food.viewValue }}
                  </mat-option>
                }
              </mat-select>
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
    currency: "",
    initSum: 0,
    typeCard: ""
  };

  @ViewChild('createMoneyAccountRef')
  createMoneyAccountRef!: NgForm

  foods = [
    {value: 'dollar', viewValue: '$'},
    {value: 'euro', viewValue: '€'},
  ];

  onSubmit() {
    if (this.createMoneyAccountRef.valid && this.model.initSum >= 0) {
      console.log('Form submitted with value:', this.model);
      this.createMoneyAccountRef.resetForm();
    }
  }
}
