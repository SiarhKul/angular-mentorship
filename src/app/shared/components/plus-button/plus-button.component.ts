import {Component, Input} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-plus-button',
  imports: [MatIconModule],
  templateUrl: './plus-button.component.html',
  styleUrl: './plus-button.component.css',
  standalone: true
})
export class PlusButtonComponent {
  @Input() icon = 'add';
}
