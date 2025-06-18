import {
  Component,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
} from '@angular/core';
import { CategoriesApiService } from '../../services/categories.api.service';
import { ICategory } from '../../types/interfaces';
import { NgForOf } from '@angular/common';
import { CATEGORIES } from '../../../../shared/constants/dictionaries';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-categories-list',
  styleUrl: './categories-list.css',
  providers: [CategoriesApiService],
  imports: [NgForOf, CategoryComponent],
  template: `
    <div class="categories">
      <div *ngFor="let category of categories ? categories() : []">
        <app-category
          [name]="category.name"
          [type]="mappingIdToCategories[category.type]"
          [id]="category.id"
        />
      </div>
    </div>
  `,
})
export class CategoriesListCtrl {
  mappingIdToCategories = _mappingIdToCategories;
  @Input() categories!: WritableSignal<Required<ICategory>[] | null> | null;
  @Output() categoryDeleted = new EventEmitter<number>();
}

const _mappingIdToCategories = CATEGORIES.reduce<Record<string, string>>(
  (acc, currentValue) => {
    return {
      ...acc,
      [currentValue.id]: currentValue.category,
    };
  },
  {},
);
