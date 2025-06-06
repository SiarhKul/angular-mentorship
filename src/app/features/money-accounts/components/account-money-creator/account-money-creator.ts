import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DrawerComponent } from '../../../../shared/components/drawer/drawer.component';
import { AccountMoney } from '../../services/models/AccountMoney';
import { AccountMoneyService } from '../../services/api/account-money.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

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
    MatSelectModule,
    MatProgressSpinner,
  ],
  providers: [AccountMoneyService],
  template: `
    <app-drawer [textHeader]="'Create money account'">
      <div ngProjectAs="drawer__content">
        <!-- просто для проверки как работает лоайдинг-->
        @if (loading()) {
        <mat-spinner></mat-spinner>
        } @else {
        <form
          id="create-money-account"
          #createMoneyAccountRef="ngForm"
          (ngSubmit)="onSubmit()"
        >
          <mat-form-field appearance="outline" class="mat-form-field">
            <mat-label>Account Name</mat-label>
            <input
              [(ngModel)]="model.typeCard"
              autocomplete="typeCard"
              matInput
              name="typeCard"
              required
              type="text"
            />
            <mat-error> Account name is required </mat-error>
          </mat-form-field>
          <mat-form-field appearance="outline" class="mat-form-field">
            <mat-label>Initial summa</mat-label>
            <input
              [(ngModel)]="model.initSum"
              autocomplete="initSum"
              matInput
              name="initSum"
              type="number"
              min="0"
            />
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
        }
      </div>

      <div ngProjectAs="footer__buttons">
        <button
          mat-stroked-button
          form="create-money-account"
          type="submit"
          [disabled]="createMoneyAccountRef?.invalid"
        >
          Save
        </button>
      </div>
    </app-drawer>
  `,
})
export class AccountMoneyCreator {
  @Output() submitClicked: EventEmitter<AccountMoney> = new EventEmitter();
  public loading = input(false);

  model = new AccountMoney();
  currencies = [
    { value: 'dollar', viewValue: '$' },
    { value: 'euro', viewValue: '€' },
  ];

  @ViewChild('createMoneyAccountRef')
  createMoneyAccountRef!: NgForm;

  public onSubmit(): void {
    if (this.createMoneyAccountRef?.invalid) {
      return;
    }

    // тут все таки по архитектуре лучше иметь всю логику связанную с сервисом в одном месте, это может быть либо умный компоент (в нашем случае им будет MoneyAccounts)
    // либо в каком-то фасаде (тоже сервис, но как доп слой абстракции между компонентами и апи-сервисом). дамб компонент ничего не знает о сервисах, он только рисует,т.е. имеет инпут\аутпут ну и темплейт.
    // ты вроде и так знаешь этот подход, вроде без изысков он, но основные принципы соблюдены + он предсказуемый), оч популярен

    console.log('Form submitted with value:', this.model);
    this.submitClicked.emit(this.model);

    // На реальном проекте форму наверное надо было бы ресетать только в случае успешного create реквеста, и надо было бы добавлять инпут из родителя сюда для этого (чтобы запускать ресетинг в нужное время к примеру), но у нас не реальный проект)
    this.createMoneyAccountRef.resetForm();
  }
}
