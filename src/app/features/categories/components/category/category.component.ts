import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoriesApiService } from '../../services/categories.api.service';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  imports: [NgClass, MatIcon, MatButtonModule],
})
export class CategoryComponent {
  @Input() name!: string;
  @Input() type!: string;
  @Input() id!: number;

  constructor(private cs: CategoriesService) {}

  onEdit() {
    console.log(1);
  }

  onDelete(id: number) {
    this.cs.deleteCategory(id);
  }
}
