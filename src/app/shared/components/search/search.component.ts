import {
  AfterViewChecked,
  Component,
  computed,
  effect,
  Input,
  model,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
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
export class SearchComponent implements AfterViewChecked {
  searchTerm = signal<string>('');
  filtrCat = model<Required<ICategory>[]>();

  @Input({ required: true })
  categories!: WritableSignal<Required<ICategory>[] | null>;

  filteredCategories = computed(() => {
    const categoriesValue = this.categories();
    if (categoriesValue === null) {
      return null;
    }
    let filter = categoriesValue.filter((c) => {
      return c.name
        .toLocaleLowerCase()
        .includes(this.searchTerm().toLocaleLowerCase());
    });
    console.log('filter', filter);

    this.filtrCat.set(filter);

    return filter;
  });
  ngAfterViewChecked() {
    console.log(this.filtrCat());
  }
}
