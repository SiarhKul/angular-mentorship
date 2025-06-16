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

  constructor(
    private cs: CategoriesApiService,
    private css: CategoriesService,
  ) {}

  onEdit() {
    console.log(1);
  }

  onDelete(id: number) {
    this.css.handleOnDelete(id, {});
  }

  /*  onDelete(id: number) {
    this.cs.deleteCategory(id).subscribe({
      next: () => {
        this.categoryDeleted.emit(id);
      },
      error: (error) => {
        //todo:Add toast
        console.error('Error deleting category', error);
      },
    });
    console.log(id);
  }*/
}
