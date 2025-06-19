import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoriesService } from '../../services/categories.service';
import { ICategory } from '../../types/interfaces';
import { CATEGORIES } from '../../../../shared/constants/dictionaries';

const mappingIdToCategories = CATEGORIES.reduce(
  (acc, { id, category }) => ({ ...acc, [id]: category }),
  {} as Record<string, string>,
);

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  imports: [NgClass, MatIcon, MatButtonModule],
})
export class CategoryComponent {
  @Input()
  category!: Required<ICategory>;

  //todo: Mentor:  how to avoid getting 'underfined'
  type = 'Income';
  //
  // type = mappingIdToCategories[this.category.type];

  constructor(private cs: CategoriesService) {}

  onEdit() {
    this.cs.updateCategory(this.category);
    console.log(1);
  }

  onDelete(id: number) {
    this.cs.deleteCategory(id);
  }
}
