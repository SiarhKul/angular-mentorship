import {Component} from "@angular/core";
import {PlusButtonComponent} from "../plus-button/plus-button.component";

@Component({
  selector: 'app-drawer',
  styleUrls: ['./drawer.component.css'],
  imports: [PlusButtonComponent],
  standalone: true,
  template:
    `
      <div class="drawer-container">
        <div [class.drawer--open]="isOpen" class="drawer">
          <div class="drawer__content">
            <ng-content/>
          </div>
        </div>
        <div (click)="toggleDrawer()">
          <app-plus-button/>
        </div>
      </div>
    `,
})
export class DrawerComponent {
  isOpen = false;

  toggleDrawer() {
    this.isOpen = !this.isOpen;
  }
}
