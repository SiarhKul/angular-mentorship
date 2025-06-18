import { Component, WritableSignal } from '@angular/core';
import { CategoriesCreator } from './components/categories-creator/categories-creator';
import { CategoriesListCtrl } from './components/categories-list/categories-list';
import { ICategory } from './types/interfaces';
import { CategoriesApiService } from './services/categories.api.service';
import { CategoriesService } from './services/categories.service';

@Component({
  selector: 'app-categories',
  styleUrl: './categories.component.css',
  standalone: true,
  providers: [CategoriesApiService, CategoriesService],
  imports: [CategoriesCreator, CategoriesListCtrl],
  template: ` <section class="categories-container">
    <app-categories-list
      [categories]="categories$"
      (categoryDeleted)="handleCategoryDeleted($event)"
      class="app-categories-list"
    />
    <app-categories-creator />
  </section>`,
})
export class CategoriesComponent {
  categories$: WritableSignal<Required<ICategory>[] | null> | null = null;
  // categories$: Observable<Required<ICategory>[]>;

  constructor(
    private cs: CategoriesApiService,
    private categoriesService: CategoriesService,
  ) {
    this.categories$ = this.categoriesService.categSignal;
    // this.categories$ = this.categoriesService.categories$;
  }

  protected handleCategoryDeleted(id: number) {
    // this.categories$ = this.cs.getAllCategories();
  }
}
