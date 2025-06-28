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
  categoriesSignal!: WritableSignal<Required<ICategory>[] | null>;

  @Input()
  filteredCategoriesSignal!: WritableSignal<Required<ICategory>[] | null>;

  filteredCategories = computed(() => {
    const categories = this.categoriesSignal();
    if (!categories) return null;

    return categories.filter((c) =>
      c.name.toLowerCase().includes(this.searchTerm().toLowerCase()),
    );
  });

  constructor() {
    effect(() => {
      this.filteredCategoriesSignal.set(this.filteredCategories());
    });
  }
}
