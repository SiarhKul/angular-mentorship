import {Component, Input} from "@angular/core";
import {CategoriesService} from "../../services/categories.service";
import {ICategory} from "../../types/interfaces";
import {NgForOf} from "@angular/common";
import {CATEGORIES} from "../../../../shared/constants/dictionaries";
import {CategoryComponent} from "../category/category.component";

@Component({
  selector: "app-categories-list",
  styleUrl: "./categories-list.css",
  providers: [CategoriesService],
  imports: [
    NgForOf,
    CategoryComponent
  ],
  template:
    `
      <div class="categories">
        <div *ngFor="let category of categories">
          <app-category
              [name]="category.name"
              [type]="mappingIdToCategories[category.type]"
          />
        </div>
      </div>
    `
})
export class CategoriesListCtrl {
  mappingIdToCategories = _mappingIdToCategories
  @Input() categories!: Required<ICategory>[] | null;

}

const _mappingIdToCategories = CATEGORIES
  .reduce<Record<string, string>>((acc, currentValue) => {
    return {
      ...acc,
      [currentValue.id]: currentValue.category
    }
  }, {})
