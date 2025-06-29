import {
  Component,
  Input,
  signal,
  WritableSignal,
  effect,
  computed,
  OnInit,
  OnDestroy,
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
import { MatIconButton } from '@angular/material/button';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatInput,
    FormsModule,
    MatLabel,
    MatSuffix,
    MatIconButton,
  ],
  template: `
    <mat-form-field style="width: 50%">
      <mat-label>Search categories</mat-label>
      <input
        matInput
        type="text"
        [ngModel]="searchTerm()"
        (ngModelChange)="onSearchChange($event)"
      />
      @if (searchTerm()) {
        <button
          matSuffix
          mat-icon-button
          aria-label="Clear"
          (click)="clearSearch()"
        >
          <mat-icon>close</mat-icon>
        </button>
      }
    </mat-form-field>
  `,
})
export class SearchComponent implements OnInit, OnDestroy {
  searchTerm = signal('');
  private searchTerms$ = new Subject<string>();
  private destroy$ = new Subject<void>();

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

  ngOnInit(): void {
    this.searchTerms$
      .pipe(debounceTime(700), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((term) => {
        this.searchTerm.set(term);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchChange(term: string): void {
    this.searchTerms$.next(term);
  }

  clearSearch(): void {
    this.searchTerms$.next('');
    this.searchTerm.set('');
  }
}
