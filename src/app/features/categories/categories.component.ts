import { Component } from '@angular/core';
import { CategoriesCreator } from './components/categories-creator/categories-creator';
import { CategoriesListCtrl } from './components/categories-list/categories-list';
import { ICategory } from './types/interfaces';
import { CategoriesApiService } from './services/categories.api.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-categories',
  styleUrl: './categories.component.css',
  standalone: true,
  providers: [CategoriesApiService, CategoriesApiService],
  imports: [CategoriesCreator, CategoriesListCtrl, AsyncPipe],
  template: ` <section class="categories-container">
    <app-categories-list
      [categories]="categories$ | async"
      (categoryDeleted)="handleCategoryDeleted($event)"
      class="app-categories-list"
    />
    <app-categories-creator (onSuccessSubmit)="handleOnSuccessSubmit($event)" />
  </section>`,
})
//todo: Mentor: Ask about naming convention 'handleOnSuccessSubmit'
export class CategoriesComponent {
  categories$: Observable<Required<ICategory>[]>;

  constructor(
    private cs: CategoriesApiService,
    private categoriesService: CategoriesApiService,
  ) {
    this.categories$ = this.cs.getAllCategories();
  }

  protected handleOnSuccessSubmit($event: Required<ICategory>) {
    this.categories$ = this.cs.getAllCategories();
  }

  protected handleCategoryDeleted(id: number) {
    this.categories$ = this.cs.getAllCategories();
  }
}
