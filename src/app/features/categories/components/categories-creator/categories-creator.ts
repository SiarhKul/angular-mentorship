import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  output,
  model,
  ViewChild,
} from '@angular/core';
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
      <app-drawer [textHeader]="'Create category'">
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
          <button
            [disabled]="isLoading()"
            form="create-category"
            mat-stroked-button
            type="button"
            (click)="onSubmit(formRef)"
          >
            Save
          </button>
        </footer>

        <div ngProjectAs="alternative__trigger">
          <ng-content select="alternative__trigger" />
        </div>
      </app-drawer>
    </div>
  `,
})
export class CategoriesCreator {
  categories = CATEGORIES;

  model: ICategory = {
    name: '',
    type: 1,
  };

  @Input()
  initFormValues?: Required<ICategory>;

  //todo: check Ts config
  @Input({ required: true })
  submitAction!: Function;

  @ViewChild(DrawerComponent)
  drawer!: DrawerComponent;

  @ViewChild('formRef')
  formRef!: NgForm;

  constructor(private categoriesService: CategoriesService) {}

  isLoading() {
    return this.categoriesService.isLoadingSignal();
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
      this.submitAction(category, {
        onSuccess: () => {
          if (this.drawer) {
            this.drawer.closeDrawer();
          }
        },
      });
    }
  }

  private initializeModel(): void {
    if (this.initFormValues) {
      this.model = {
        name: this.initFormValues.name,
        type: this.initFormValues.type,
      };
    }
  }
}
