import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-drawer',
  styleUrls: ['./drawer.component.css'],
  imports: [MatButtonModule, MatIconModule, NgClass],
  standalone: true,
  template: `
    <div class="drawer-container">
      @if (isOpen) {
        <div class="drawer-overlay" (click)="closeDrawer()"></div>
      }

      <div [ngClass]="{ 'drawer--open': isOpen }" class="drawer">
        <div class="drawer__header">
          <h3>
            {{ textHeader }}
          </h3>

          <button mat-icon-button (click)="closeDrawer()">
            <mat-icon>close</mat-icon>
          </button>
        </div>

        <div class="drawer__content">
          <ng-content select="drawer__content" />
        </div>

        <section class="drawer__button-block">
          <div (click)="closeDrawer()">
            <ng-content select="footer__buttons" />
          </div>

          @if (isCloseButtonVisible) {
            <button (click)="closeDrawer()" mat-button>Cancel</button>
          }
        </section>
      </div>

      <div (click)="toggleDrawer()">
        <ng-content select="alternative__trigger" />
      </div>
    </div>
  `,
})
export class DrawerComponent {
  isOpen = false;

  @Input()
  textHeader = 'Drawer header';

  @Input()
  isCloseButtonVisible = true;

  toggleDrawer() {
    this.isOpen = !this.isOpen;
  }

  closeDrawer() {
    this.isOpen = false;
  }
}
