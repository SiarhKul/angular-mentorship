import { Component, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    FormsModule,
    MatLabel,
  ],
  template: `
    <mat-form-field style="width: 50%">
      <mat-label>Search categories</mat-label>
      <input matInput type="text" [(ngModel)]="value" />
      @if (value()) {
        <button
          matSuffix
          matIconButton
          aria-label="Clear"
          (click)="value.set('')"
          mat-icon-button
        >
          <mat-icon>close</mat-icon>
        </button>
      }
    </mat-form-field>
  `,
})
export class SearchComponent {
  value = signal('');
}
