import {Component, Input} from "@angular/core";
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
            <h3>
              {{ textHeader }}
            </h3>

            <button mat-icon-button (click)="closeDrawer()">
              <mat-icon>close</mat-icon>
            </button>
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

  @Input()
  textHeader = 'Drawer header';

  toggleDrawer() {
    this.isOpen = !this.isOpen;
  }

  closeDrawer() {
    this.isOpen = false;
  }
}
