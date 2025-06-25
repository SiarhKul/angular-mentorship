import { Component, computed, signal, WritableSignal } from '@angular/core';
import { CategoriesCreator } from './components/categories-creator/categories-creator';
import { CategoriesListCtrl } from './components/categories-list/categories-list';
import { ICategory } from './types/interfaces';
import { CategoriesApiService } from './services/categories.api.service';
import { CategoriesService } from './services/categories.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-categories',
  styleUrl: './categories.component.css',
  standalone: true,
  providers: [CategoriesApiService],
  imports: [
    CategoriesCreator,
    CategoriesListCtrl,
    ButtonComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIcon,
  ],
  template: `
    <section class="categories-container">
      @if (isLoadingSignal() && categories == null) {
        <div>Content is loading...</div>
      }

      @if (filteredCategories() !== null) {
        <section class="categories-section">
          <mat-form-field style="width: 50%">
            <mat-label>Search categories</mat-label>
            <input matInput type="text" [(ngModel)]="value" />
            @if (value()) {
              <button
                matSuffix
                matIconButton
                aria-label="Clear"
                (click)="value.set('')"
                mat-icon-button
              >
                <mat-icon>close</mat-icon>
              </button>
            }
          </mat-form-field>

          @if ((filteredCategories() || []).length === 0) {
            <div>No categories found matching your search.</div>
          } @else {
            <app-categories-list
              [categories]="filteredCategories"
              class="app-categories-list"
            />
          }
        </section>
      }

      <app-categories-creator [submitAction]="saveCategory">
        <div ngProjectAs="alternative__trigger">
          <app-button
            [buttonContent]="'Add categories'"
            [customStyles]="{
              backgroundColor: 'var(--background-color-primary)',
              color: 'black',
              width: 'auto',
              whiteSpace: 'nowrap',
            }"
            [icon]="'savings'"
          />
        </div>
      </app-categories-creator>
    </section>
  `,
})
export class CategoriesComponent {
  isLoadingSignal: WritableSignal<boolean> = signal(false);
  value = signal('');

  categories: WritableSignal<Required<ICategory>[] | null> | null = null;

  someMethod = () => {};
  filteredCategories = computed(() => {
    if (!this.categories) {
      return null;
    }
    const categoriesValue = this.categories();
    if (categoriesValue === null) {
      return null;
    }
    let filter = categoriesValue.filter((c) => {
      return c.name
        .toLocaleLowerCase()
        .includes(this.value().toLocaleLowerCase());
    });
    return filter;
  });

  constructor(private categoriesService: CategoriesService) {
    this.categories = this.categoriesService.categoriesSignal;
    this.isLoadingSignal = this.categoriesService.isLoadingSignal;
  }

  saveCategory(
    category: ICategory,
    callbacks: {
      onSuccess?: Function;
      onError?: Function;
      onComplete?: Function;
    },
  ) {
    this.categoriesService.saveCategory(category, callbacks);
  }
}
