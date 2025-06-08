import {Component, Input} from "@angular/core";
import {PlusButtonComponent} from "../plus-button/plus-button.component";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-button',
  imports: [
    PlusButtonComponent,
    NgStyle
  ],
  styleUrl: './button.component.css',
  template: `
    <div class="button" [ngStyle]="customStyles">
      <app-plus-button [icon]="icon"/>
      <span>{{ buttonContent }}</span>
    </div>
  `,
})
export class ButtonComponent {
  @Input()
  buttonContent = 'Default Value'
  @Input()
  icon = 'add'
  @Input()
  customStyles!: Partial<CSSStyleDeclaration>


}
