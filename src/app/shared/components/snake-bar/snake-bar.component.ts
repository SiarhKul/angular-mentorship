import { Component, inject, Inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-snake-bar',
  templateUrl: './snake-bar.component.html',
  standalone: true,
  imports: [MatSnackBarModule],
})
export class SnakeBarComponent {
  durationInSeconds = 5;
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(SnakeBarContentComponent, {
      duration: this.durationInSeconds * 10000,
      data: { message },
    });
  }
}

@Component({
  selector: 'app-snake-bar-content',
  template: `
    <span matSnackBarLabel>{{ data.message }}</span>
    <div matSnackBarActions>
      <button
        mat-button
        matSnackBarAction
        (click)="snackBarRef.dismissWithAction()"
      >
        Close
      </button>
    </div>
  `,
  styles: `
    :host {
      display: flex;
    }
  `,
  standalone: true,
  imports: [
    MatButtonModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
  ],
})
export class SnakeBarContentComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<SnakeBarContentComponent>,

    @Inject(MAT_SNACK_BAR_DATA)
    public data: { message: string },
  ) {}
}
