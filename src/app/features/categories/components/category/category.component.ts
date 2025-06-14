import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-category',
  imports: [
    NgClass,
    MatIcon,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  @Input()
  name!: string;
  @Input()
  type!: string;
}
