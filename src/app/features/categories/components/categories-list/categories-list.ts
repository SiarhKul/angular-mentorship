import { Component, Input, WritableSignal } from '@angular/core';
import { CategoriesApiService } from '../../services/categories.api.service';
import { ICategory } from '../../types/interfaces';
import { NgForOf } from '@angular/common';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-categories-list',
  styleUrl: './categories-list.css',
  providers: [CategoriesApiService],
  imports: [NgForOf, CategoryComponent],
  template: `
    <div class="categories">
      <div *ngFor="let category of categories?.() || []">
        <app-category [category]="category" />
      </div>
    </div>
  `,
})
export class CategoriesListCtrl {
  @Input()
  categories!: WritableSignal<Required<ICategory>[] | null> | null;
  // mappingIdToCategories = CATEGORIES.reduce(
  //   (acc, { id, category }) => ({ ...acc, [id]: category }),
  //   {} as Record<string, string>,
  // );
}
