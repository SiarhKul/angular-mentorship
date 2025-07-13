import { Component, signal, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { DrawerComponent } from '../../../../shared/components/drawer/drawer.component';
import { MatButton } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import { CATEGORIES } from '../../../../shared/constants/dictionaries';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgStyle } from '@angular/common';
import { ECategories } from '../../../../features/categories/types/enums';
import { RootService } from '../../root.service';
import { ITransaction } from '../../types/interfaces';
import { AsyncSelectorComponent } from '../../../../shared/components/async-selector/async-selector.component';

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
              [(ngModel)]="model.category"
            >
              <mat-button-toggle
                [style]="{
                  'background-color': 'var(--background-color-allow)',
                }"
                [value]="categories.INCOME"
                >Income</mat-button-toggle
              >
              <mat-button-toggle
                [style]="{
                  'background-color': 'var(--background-color-not-allow)',
                }"
                [value]="categories.EXPENSES"
                >Expenses</mat-button-toggle
              >
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

          <app-async-selector [inlineStyles]="{ width: '100%' }" />

          <mat-form-field appearance="outline">
            <mat-label>Amount</mat-label>
            <input
              [(ngModel)]="model.amount"
              matInput
              name="amount"
              required
              type="number"
            />
            <mat-error>Amount is required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Date</mat-label>
            <input
              [(ngModel)]="model.date.toISOString().split('T')[0]"
              matInput
              name="date"
              required
              type="date"
            />
            <mat-error>Date is required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Payee</mat-label>
            <input
              [(ngModel)]="model.payee"
              matInput
              name="payee"
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
              name="description"
              required
              type="text"
            />
            <mat-error> Title is required</mat-error>
          </mat-form-field>
        </form>
      </div>

      <footer ngProjectAs="footer__buttons">
        <button
          (click)="onSubmit(formRef)"
          form="transaction-category"
          mat-stroked-button
          type="button"
        >
          Save
        </button>
      </footer>

      <div ngProjectAs="alternative__trigger">
        <app-button
          [icon]="'add'"
          [buttonContent]="'Create transaction'"
          [customStyles]="{
            backgroundColor: 'var(--background-color-primary-dark)',
            color: 'black',
            width: 'auto',
            whiteSpace: 'nowrap',
          }"
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
    AsyncSelectorComponent,
  ],
})
export class TransactionCreatorComponent {
  categories = ECategories;

  @ViewChild(DrawerComponent)
  drawer!: DrawerComponent;

  model: ITransaction = {
    title: '',
    amount: 0,
    date: new Date(),
    payee: '',
    description: '',
    category: ECategories.EXPENSES,
  };

  constructor(private rootService: RootService) {}

  async onSubmit(formRef: NgForm) {
    const {
      form: { value },
      valid,
    } = formRef;

    console.log('aaaa', formRef);

    if (valid) {
      await this.rootService.createTransactionAsync(value, {
        onSuccess: () => {
          this.drawer.closeDrawer();
          formRef.resetForm();
        },
      });
    }
  }
}
