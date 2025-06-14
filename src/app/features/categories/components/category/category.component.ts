import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  imports: [
    NgClass,
    MatIcon,
    MatButtonModule
  ]
})
export class CategoryComponent {
  @Input()
  name!: string;
  @Input()
  type!: string;

  onEdit() {
    console.log(1)
  }

  onDelete() {
    console.log(2)
  }
}
