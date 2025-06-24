import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoriesService } from '../../services/categories.service';
import { ICategory } from '../../types/interfaces';
import { CATEGORIES } from '../../../../shared/constants/dictionaries';
import { CategoriesCreator } from '../categories-creator/categories-creator';

const mappingIdToCategories = CATEGORIES.reduce(
  (acc, { id, category }) => ({ ...acc, [id]: category }),
  {} as Record<string, string>,
);

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  imports: [NgClass, MatIcon, MatButtonModule, CategoriesCreator],
})
export class CategoryComponent implements OnChanges {
  @Input({ required: true })
  category!: Required<ICategory>;

  type = '';

  constructor(private categoryService: CategoriesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category']) {
      this.type = mappingIdToCategories[this.category.type];
    }
  }

  updateCategory = (category: ICategory, cbs: Record<string, Function>) => {
    const enrichedCategory: Required<ICategory> = {
      ...category,
      id: this.category.id,
    };

    this.categoryService.updateCategory(enrichedCategory, cbs);
  };
  onDelete(id: string) {
    this.categoryService.deleteCategory(id);
  }
}
