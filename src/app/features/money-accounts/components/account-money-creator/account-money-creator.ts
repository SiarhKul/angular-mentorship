import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, NgForm} from "@angular/forms";
import {MatInput, MatLabel} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {
  DrawerComponent
} from "../../../../shared/components/drawer/drawer.component";
import {AccountMoney} from "../../services/models/AccountMoney";
import {AccountMoneyService} from "../../services/api/account-money.service";
import {AccountMoneyCards} from "../account-money-cards/account-money-cards";

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
  providers: [AccountMoneyService],
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
              <mat-select [(ngModel)]="model.currency" name="currency">
                @for (currency of currencies; track currency) {
                  <mat-option [value]="currency.value">
                    {{ currency.viewValue }}
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
  @Input()

  cardsComponent!: AccountMoneyCards;
  @Output()
  onCreate: EventEmitter<number | null> = new EventEmitter();

  model = new AccountMoney()
  currencies = [
    {value: 'dollar', viewValue: '$'},
    {value: 'euro', viewValue: '€'},
  ];
  submitted = false;
  loading = false;
  error = '';

  @ViewChild('createMoneyAccountRef')
  createMoneyAccountRef!: NgForm

  constructor(private ams: AccountMoneyService) {
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';

    if (this.createMoneyAccountRef.valid) {
      this.ams.create(this.model).subscribe(
        {
          next: moneyAccount => {
            console.log('moneyAccount', moneyAccount)
            this.loading = false;
            this.onCreate.emit(moneyAccount.id);
          },
          error: error => {
            this.onCreate.emit(null);
            this.error = error;
          },
          complete: () => {
            this.loading = false
          }
        }
      )
      console.log('Form submitted with value:', this.model);
      this.createMoneyAccountRef.resetForm();
    } else {
      this.submitted = false;
      this.loading = false;
    }
  }
}
