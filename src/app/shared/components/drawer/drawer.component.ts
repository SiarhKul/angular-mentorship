import {Component} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {PlusButtonComponent} from "../plus-button/plus-button.component";

@Component({
  selector: 'app-drawer',
  styleUrls: ['./drawer.component.css'],
  imports: [MatButtonModule, MatDividerModule, MatIconModule, PlusButtonComponent],
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


          <section class="drawer__button-block">
            <button (click)="closeDrawer()" mat-button>Cancel</button>
          </section>
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

  closeDrawer() {
    this.isOpen = false;
  }
}
