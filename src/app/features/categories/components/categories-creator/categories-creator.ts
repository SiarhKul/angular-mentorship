import {Component, output, ViewChild} from "@angular/core";
import {
  ButtonComponent
} from "../../../../shared/components/button/button.component";
import {
  DrawerComponent
} from "../../../../shared/components/drawer/drawer.component";
import {FormsModule, NgForm} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel
} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {CategoriesService} from "../../services/categories.service";
import {ICategory} from "../../types/interfaces";
import {Category} from "../../models/Category";
import {CATEGORIES} from "../../../../shared/constants/dictionaries";


@Component({
  styleUrl: "./categories-creator.css",
  selector: 'app-categories-creator',
  providers: [CategoriesService],
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
    MatSelect
  ],
  template: `
    <div class="categories-management">
      <app-drawer [atternativeTrigger]="alternativeTrigger"
                  [textHeader]="'Create category'"
      >
        <div ngProjectAs="drawer__content">
          <form
              #formRef="ngForm"
              (ngSubmit)="onSubmit(formRef)"
              id="create-category">
            <mat-form-field
                appearance='outline'
                class='mat-form-field'
            >
              <mat-label>Account Name</mat-label>
              <input
                  [(ngModel)]='model.name'
                  matInput
                  name='name'
                  required
                  type='text'
              >
              <mat-error>
                Category name is required
              </mat-error>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Select category</mat-label>
              <mat-select [(ngModel)]="model.type"
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
           color: 'black'
           }"
            [icon]="'savings'"
        />
      </ng-template>
    </div>
  `
})
export class CategoriesCreator {
  submitted = false;
  loading = false;
  categories = CATEGORIES
  error = '';
  model: ICategory = {
    name: '',
    type: 1,
  }

  onSuccessSubmit = output<Required<ICategory>>()
  
  @ViewChild(DrawerComponent)
  drawer!: DrawerComponent

  constructor(private service: CategoriesService) {
  }


  onSubmit(formRef: NgForm) {
    const {form: {value}, valid} = formRef;
    this.submitted = true;
    this.loading = true;
    this.error = '';


    const category: ICategory = Category.builder()
      .setType(value.type)
      .setName(value.name)
      .build()

    if (valid) {
      this.service.saveCategory(category).subscribe({
        next: (response) => {
          this.onSuccessSubmit.emit(response);
          if (this.drawer) {
            this.drawer.closeDrawer();
          }
          console.log('1', response);
        },
        error: error => {
        },
        complete: () => {
        }
      })

    } else {
      this.loading = false;
    }

  }
}
