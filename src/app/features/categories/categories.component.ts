import { Component, signal, WritableSignal } from '@angular/core';
import { CategoriesCreator } from './components/categories-creator/categories-creator';
import { CategoriesListCtrl } from './components/categories-list/categories-list';
import { ICategory } from './types/interfaces';
import { CategoriesApiService } from './services/categories.api.service';
import { CategoriesService } from './services/categories.service';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-categories',
  styleUrl: './categories.component.css',
  standalone: true,
  providers: [CategoriesApiService],
  imports: [CategoriesCreator, CategoriesListCtrl, ButtonComponent],
  template: `
    <section class="categories-container">
      @if (isLoadingSignal() && categories == null) {
        <div>Content is loading...</div>
      }
      @if (categories !== null) {
        <app-categories-list
          [categories]="categories"
          class="app-categories-list"
        />
      }
      <app-categories-creator [submitAction]="saveCategory">
        <div ngProjectAs="alternative__trigger">
          <app-button
            [buttonContent]="'Add categories'"
            [customStyles]="{
              backgroundColor: 'var(--background-color-primary)',
              color: 'black',
            }"
            [icon]="'savings'"
          />
        </div>
      </app-categories-creator>
    </section>
  `,
})
export class CategoriesComponent {
  categories: WritableSignal<Required<ICategory>[] | null> | null = null;
  isLoadingSignal: WritableSignal<boolean> = signal(false);

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
