import {Component} from '@angular/core';
import {
  PlusButtonComponent
} from "../../shared/components/plus-button/plus-button.component";

@Component({
  selector: 'app-categories',
  imports: [
    PlusButtonComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

}
