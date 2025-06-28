import {
  Component,
  Input,
  signal,
  WritableSignal,
  effect,
  computed,
} from '@angular/core';
import {
  MatFormField,
  MatInput,
  MatLabel,
  MatSuffix,
} from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ICategory } from '../../../features/categories/types/interfaces';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatFormField, MatIcon, MatInput, FormsModule, MatLabel, MatSuffix],
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
        >
          <mat-icon>close</mat-icon>
        </button>
      }
    </mat-form-field>
  `,
})
export class SearchComponent {
  searchTerm = signal('');

  @Input()
  categories!: WritableSignal<Required<ICategory>[] | null>;

  @Input()
  filtrCat!: WritableSignal<Required<ICategory>[] | null>;

  filtered = computed(() => {
    const list = this.categories();
    if (!list) return null;

    return list.filter((cat) =>
      cat.name.toLowerCase().includes(this.searchTerm().toLowerCase()),
    );
  });

  constructor() {
    effect(() => {
      this.filtrCat.set(this.filtered());
    });
  }
}
