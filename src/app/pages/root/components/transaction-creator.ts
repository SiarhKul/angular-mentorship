import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { DrawerComponent } from '../../../shared/components/drawer/drawer.component';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CATEGORIES } from '../../../shared/constants/dictionaries';
import { ICategory } from '../../../features/categories/types/interfaces';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-transaction-creator',
  template: `
    <app-drawer [textHeader]="'Create transaction'">
      <div ngProjectAs="drawer__content">
        <form #formRef="ngForm" id="create-category">
          <mat-form-field appearance="outline" class="mat-form-field">
            <mat-label>Account Name</mat-label>
            <input
              [(ngModel)]="model.name"
              matInput
              name="name"
              required
              type="text"
            />
            <mat-error> Category name is required</mat-error>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Select category</mat-label>
            <mat-select
              [(ngModel)]="model.type"
              [value]="categories[0].id"
              name="type"
            >
              @for (category of categories; track $index) {
                <mat-option [value]="category.id">
                  {{ category.category }}
                </mat-option>
              }
            </mat-select>
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
    MatSelect,
    MatOption,
    MatInput,
    MatLabel,
    MatError,
  ],
})
export class TransactionCreatorComponent {
  categories = CATEGORIES;

  model: ICategory = {
    name: '',
    type: 1,
  };
}
