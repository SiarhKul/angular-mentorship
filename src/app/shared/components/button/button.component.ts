import {Component, Input} from "@angular/core";
import {PlusButtonComponent} from "../plus-button/plus-button.component";

@Component({
  selector: 'app-button',
  imports: [
    PlusButtonComponent
  ],
  styleUrl: './button.component.css',
  template: `
    <div class="button">
      <app-plus-button/>
      <span>{{ buttonContent }}</span>
    </div>
  `,
})
export class ButtonComponent {
  @Input()
  buttonContent = 'Default Value'
}
