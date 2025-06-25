import {
  Component,
  Input,
  OnInit,
  Signal,
  WritableSignal,
} from '@angular/core';
import { CategoriesApiService } from '../../services/categories.api.service';
import { ICategory } from '../../types/interfaces';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-categories-list',
  styleUrl: './categories-list.css',
  providers: [CategoriesApiService],
  imports: [CategoryComponent],
  template: `
    <div class="categories">
      @for (category of categories(); track category.id) {
        <app-category [category]="category" />
      }
    </div>
  `,
})
export class CategoriesListCtrl {
  @Input({ required: true })
  categories!: Signal<Required<ICategory>[] | null>;
}
