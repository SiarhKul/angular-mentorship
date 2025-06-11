import {Component, OnInit} from "@angular/core";
import {CategoriesService} from "../../services/categories.service";
import {ICategory} from "../../types/interfaces";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf} from "@angular/common";
import {CATEGORIES} from "../../../../shared/constants/dictionaries";
import {CategoryComponent} from "../category/category.component";

@Component({
  selector: "app-categories-list",
  styleUrl: "./categories-list.css",
  providers: [CategoriesService],
  imports: [
    NgForOf,
    AsyncPipe,
    CategoryComponent
  ],
  template:
    `
      <div class="categories">
        <div *ngFor="let category of categories$ | async">
          <app-category
              [name]="category.name"
              [type]="mappingIdToCategories[category.type]"
          />
        </div>
      </div>
    `
})
export class CategoriesListCtrl implements OnInit {
  categories$: Observable<Required<ICategory>[]>
  mappingIdToCategories = _mappingIdToCategories

  constructor(
    private cs: CategoriesService
  ) {
    this.categories$ = this.cs.getAllCategories()
  }

  ngOnInit(): void {
    console.log('-----------', this.mappingIdToCategories)
  }
  
}

const _mappingIdToCategories = CATEGORIES
  .reduce<Record<string, string>>((acc, currentValue) => {
    return {
      ...acc,
      [currentValue.id]: currentValue.category
    }
  }, {})
