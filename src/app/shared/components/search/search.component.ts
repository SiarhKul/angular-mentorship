import { Component, model, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import {
  MatFormField,
  MatInput,
  MatLabel,
  MatSuffix,
} from '@angular/material/input';
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
    MatSuffix,
  ],
  template: `
    <mat-form-field style="width: 50%">
      <mat-label>Search categories</mat-label>
      <input matInput type="text" [(ngModel)]="searchTerm" />
      @if (searchTerm()) {
        <button
          matSuffix
          matIconButton
          aria-label="Clear"
          (click)="searchTerm.set('')"
          mat-icon-button
        >
          <mat-icon>close</mat-icon>
        </button>
      }
    </mat-form-field>
  `,
})
export class SearchComponent {
  searchTerm = model<string>('');
}
