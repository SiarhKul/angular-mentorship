import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { DrawerComponent } from '../../../../shared/components/drawer/drawer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { CategoriesApiService } from '../../services/categories.api.service';
import { ICategory } from '../../types/interfaces';
import { Category } from '../../models/Category';
import { CATEGORIES } from '../../../../shared/constants/dictionaries';
import { CategoriesService } from '../../services/categories.service';

@Component({
  styleUrl: './categories-creator.css',
  selector: 'app-categories-creator',
  providers: [CategoriesApiService],
  imports: [
    ButtonComponent,
    DrawerComponent,
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
  ],
  template: `
    <div class="categories-management">
      <app-drawer
        [atternativeTrigger]="alternativeTrigger"
        [textHeader]="'Create category'"
      >
        <div ngProjectAs="drawer__content">
          <form
            #formRef="ngForm"
            (ngSubmit)="onSubmit(formRef)"
            id="create-category"
          >
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

        <div ngProjectAs="footer__buttons">
          <button
            [disabled]="isLoading()"
            form="create-category"
            mat-stroked-button
            type="submit"
          >
            Save
          </button>
        </div>
      </app-drawer>

      <ng-template #alternativeTrigger>
        <app-button
          [buttonContent]="'Add categories'"
          [customStyles]="{
            backgroundColor: 'var(--background-color-primary)',
            color: 'black',
          }"
          [icon]="'savings'"
        />
      </ng-template>
    </div>
  `,
})
export class CategoriesCreator {
  categories = CATEGORIES;
  error = '';
  model: ICategory = {
    name: '',
    type: 1,
  };

  @ViewChild(DrawerComponent)
  drawer!: DrawerComponent;
  categoryDeleted = new EventEmitter<void>();

  constructor(private categoriesService: CategoriesService) {}

  isLoading() {
    return this.categoriesService.loading;
  }

  onSubmit(formRef: NgForm) {
    const {
      form: { value },
      valid,
    } = formRef;

    const category: ICategory = Category.builder()
      .setType(value.type)
      .setName(value.name)
      .build();

    if (valid) {
      this.categoriesService.handleOnSuccessSubmit(category, {
        onSuccess: () => {
          if (this.drawer) {
            this.drawer.closeDrawer();
          }
        },
      });
    }
  }
}
