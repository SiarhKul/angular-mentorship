import {Component} from "@angular/core";
import {CategoriesService} from "../../services/categories.service";
import {ICategory} from "../../types/interfaces";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf} from "@angular/common";

@Component({
  selector: "app-categories-list",
  styleUrl: "./categories-list.css",
  providers: [CategoriesService],
  imports: [
    NgForOf,
    AsyncPipe
  ],
  template:
    `
      <div class="categories">
        <div *ngFor="let category of categories$ | async">
          <div>{{ category.name }}</div>
        </div>
      </div>
    `
})
export class CategoriesListCtrl {
  categories$: Observable<Required<ICategory>[]>


  constructor(
    private cs: CategoriesService
  ) {
    this.categories$ = this.cs.getAllCategories()
  }

}
