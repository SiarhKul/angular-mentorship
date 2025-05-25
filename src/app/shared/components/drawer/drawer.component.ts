import {Component} from "@angular/core";
import {PlusButtonComponent} from "../plus-button/plus-button.component";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-drawer',
  styleUrls: ['./drawer.component.css'],
  imports: [PlusButtonComponent, MatButtonModule],
  standalone: true,
  template:
    `
      <div class="drawer-container">
        <div [class.drawer--open]="isOpen" class="drawer">
          <div class="drawer__header">
            <ng-content select="h3"/>
          </div>

          <div class="drawer__content">
            <ng-content/>
          </div>
          <div class="drawer__button-block">
            <button mat-button>Basic</button>
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
