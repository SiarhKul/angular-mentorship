import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
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
  @Output() categoryDeleted = new EventEmitter<number>();

  constructor(private cs: CategoriesService) {}

  onEdit() {
    console.log(1);
  }

  onDelete(id: number) {
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
  }
}
