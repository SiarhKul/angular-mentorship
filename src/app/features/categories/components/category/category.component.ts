import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoriesService } from '../../services/categories.service';
import { ICategory } from '../../types/interfaces';
import { CATEGORIES } from '../../../../shared/constants/dictionaries';
import { CategoriesCreator } from '../categories-creator/categories-creator';
import { CategoriesApiService } from '../../services/categories.api.service';

const mappingIdToCategories = CATEGORIES.reduce(
  (acc, { id, category }) => ({ ...acc, [id]: category }),
  {} as Record<string, string>,
);

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  providers: [CategoriesApiService, CategoriesService],
  imports: [NgClass, MatIcon, MatButtonModule, CategoriesCreator],
})
export class CategoryComponent {
  @Input({ required: true })
  category!: Required<ICategory>;

  //todo: Mentor:  how to avoid getting 'underfined'
  type = 'Income';
  //
  // type = mappingIdToCategories[this.category.type];

  constructor(private cs: CategoriesService) {}

  updateCategory() {
    console.log(1);
    this.cs.up();
  }

  onDelete(id: number) {
    this.cs.deleteCategory(id);
  }
}
