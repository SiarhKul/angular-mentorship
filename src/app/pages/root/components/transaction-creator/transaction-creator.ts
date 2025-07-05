import { Component, signal } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { DrawerComponent } from '../../../../shared/components/drawer/drawer.component';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CATEGORIES } from '../../../../shared/constants/dictionaries';
import { ICategory } from '../../../../features/categories/types/interfaces';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-transaction-creator',
  styleUrl: './transaction-creator.css',
  template: `
    <app-drawer [textHeader]="'Create transaction'">
      <div ngProjectAs="drawer__content">
        <form
          #formRef="ngForm"
          id="transaction-category"
          class="crete-transaction-form"
        >
          <section>
            <mat-button-toggle-group
              name="category"
              [hideSingleSelectionIndicator]="hideSingleSelectionIndicator()"
            >
              <mat-button-toggle value="income">Income</mat-button-toggle>
              <mat-button-toggle value="expenses">Expenses</mat-button-toggle>
            </mat-button-toggle-group>
          </section>

          <mat-form-field appearance="outline">
            <mat-label>Title</mat-label>
            <input
              [(ngModel)]="model.title"
              matInput
              name="title"
              required
              type="text"
            />
            <mat-error> Title is required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Amount</mat-label>
            <input
              [(ngModel)]="model.amount"
              matInput
              name="title"
              required
              type="number"
            />
            <mat-error>Amount is required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Date</mat-label>
            <input
              [(ngModel)]="model.date"
              matInput
              name="date"
              required
              type="datetime-local"
            />
            <mat-error>Date is required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Payee</mat-label>
            <input
              [(ngModel)]="model.payee"
              matInput
              name="title"
              required
              type="text"
            />
            <mat-error>Payee is required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Description</mat-label>
            <input
              [(ngModel)]="model.description"
              matInput
              name="title"
              required
              type="text"
            />
            <mat-error> Title is required</mat-error>
          </mat-form-field>
        </form>
      </div>

      <footer ngProjectAs="footer__buttons">
        <button form="create-category" mat-stroked-button type="button">
          Save
        </button>
      </footer>

      <div ngProjectAs="alternative__trigger">
        <app-button
          [buttonContent]="'Create transaction'"
          [customStyles]="{
            backgroundColor: 'var(--background-color-primary-dark)',
            color: 'black',
            width: 'auto',
            whiteSpace: 'nowrap',
          }"
          [icon]="'add'"
        />
      </div>
    </app-drawer>
  `,
  standalone: true,
  imports: [
    DrawerComponent,
    MatButton,
    ButtonComponent,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    MatButtonToggleModule,
    MatCheckboxModule,
  ],
})
export class TransactionCreatorComponent {
  categories = CATEGORIES;

  model = {
    title: '',
    amount: 0,
    date: new Date(),
    payee: '',
    description: '',
  };

  hideSingleSelectionIndicator = signal(false);
  hideMultipleSelectionIndicator = signal(false);

  toggleSingleSelectionIndicator() {
    this.hideSingleSelectionIndicator.update((value) => !value);
  }

  toggleMultipleSelectionIndicator() {
    this.hideMultipleSelectionIndicator.update((value) => !value);
  }
}
