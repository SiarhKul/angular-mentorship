import {Component} from "@angular/core";
import {
  CategoriesCreator
} from "./components/categories-creator/categories-creator";
import {CategoriesListCtrl} from "./components/categories-list/categories-list";

@Component({
  selector: "app-categories",
  styleUrl: "./categories.component.css",
  standalone: true,
  imports: [
    CategoriesCreator,
    CategoriesListCtrl
  ],
  template: `
    <section class="categories-container">
      <app-categories-list class="app-categories-list"/>
      <app-categories-creator/>
    </section>`
})
export class CategoriesComponent {

}
