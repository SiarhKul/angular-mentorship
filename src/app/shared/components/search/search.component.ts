import {
  Component,
  Input,
  signal,
  WritableSignal,
  effect,
  computed,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
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
export class SearchComponent implements OnInit, OnDestroy, OnChanges {
  searchTerm = signal('');
  private searchTerms$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  @Input()
  changeSearchTerm!: (searchTerm: string) => null | Required<ICategory>[];

  ngOnChanges(changes: SimpleChanges): void {
    console.log('1111', this.searchTerm());
    if (changes['searchTerm']) {
      console.log('fffffffff', this.searchTerm());
      this.changeSearchTerm(this.searchTerm());
    }
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
