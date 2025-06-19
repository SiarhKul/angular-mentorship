import { Component, signal, WritableSignal } from '@angular/core';
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
  template: `
    <section class="categories-container">
      @if (isLoadingSignal()) {
        <div>Content is loading...</div>
      } @else {
        <app-categories-list
          [categories]="categories"
          class="app-categories-list"
        />
      }

      <app-categories-creator />
    </section>
  `,
})
export class CategoriesComponent {
  categories: WritableSignal<Required<ICategory>[] | null> | null = null;
  isLoadingSignal: WritableSignal<boolean> = signal(false);

  constructor(private categoriesService: CategoriesService) {
    this.categories = this.categoriesService.categoriesSignal;
    this.isLoadingSignal = this.categoriesService.isLoadingSignal;
    console.log('222222222222222222', this.isLoadingSignal());
  }
}
