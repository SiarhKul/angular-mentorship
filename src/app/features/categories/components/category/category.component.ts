import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoriesService } from '../../services/categories.service';
import { ICategory } from '../../types/interfaces';
import { CATEGORIES } from '../../../../shared/constants/dictionaries';
import { CategoriesCreator } from '../categories-creator/categories-creator';
import { CategoriesApiService } from '../../services/categories.api.service';
import { IonResponseCallbacks } from '../../../../shared/types/types';
import { ECategories } from '../../types/enums';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  providers: [CategoriesApiService],
  imports: [NgClass, MatIcon, MatButtonModule, CategoriesCreator],
  standalone: true,
})
export class CategoryComponent implements OnInit {
  @Input({ required: true })
  category!: Required<ICategory>;
  type = '';

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.type = this.getCategoryTypeLabel(this.category.type);
  }

  updateCategory(category: ICategory, callbacks: IonResponseCallbacks): void {
    const enrichedCategory: Required<ICategory> = {
      ...category,
      id: this.category.id,
    };
    this.categoryService.updateCategory(enrichedCategory, callbacks);
  }

  onDelete(id: string): void {
    this.categoryService.deleteCategory(id);
  }

  private getCategoryTypeLabel(typeId: number): string {
    const categoryMap = CATEGORIES.reduce<Record<string, string>>(
      (acc, { id, category }) => ({ ...acc, [id]: category }),
      {},
    );
    return categoryMap[typeId] || ECategories.UNKNOWN;
  }
}
