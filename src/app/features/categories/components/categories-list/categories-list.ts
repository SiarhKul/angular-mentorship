import {Component} from "@angular/core";
import {CategoriesService} from "../../services/categories.service";

@Component({
  selector: "app-categories-list",
  styleUrl: "./categories-list.css",
  providers: [CategoriesService],
  template:
    `
      <div class="categories">
        <div>Category 1</div>
        <div>Category 2</div>
        <div>Category 3</div>
      </div>
    `
})
export class CategoriesListCtrl {


}
