import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-category-type',
  imports: [MatIconModule],
  templateUrl: './category-type.component.html',
  styleUrl: './category-type.component.css',
})
export class CategoryTypeComponent {
  @Input() isIncome = true;
}
