import { Component, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgStyle } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../../constants/api-url';
import { CATEGORY_ENDPOINT } from '../../constants/endpoints';
import { ICategory } from '../../../features/categories/types/interfaces';
import { TUUID } from '../../types/types';

@Component({
  standalone: true,
  selector: 'app-async-selector',
  styleUrl: './async-selector.component.css',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgStyle,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AsyncSelectorComponent,
      multi: true,
    },
  ],
  template: `
    <mat-form-field [ngStyle]="inlineStyles" appearance="outline">
      <mat-label>Categories</mat-label>
      <mat-select [formControl]="formControl" multiple>
        <mat-select-trigger>
          {{ formControl.value?.[0] || '' }}
          @if ((formControl.value?.length || 0) > 1) {
            <span class="example-additional-selection">
              (+{{ (formControl.value?.length || 0) - 1 }}
              {{ formControl.value?.length === 2 ? 'other' : 'others' }})
            </span>
          }
        </mat-select-trigger>

        @for (value of values; track $index) {
          <mat-option [value]="value.name">
            {{ value.name }}
          </mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
})
export class AsyncSelectorComponent implements OnInit, ControlValueAccessor {
  @Input()
  inlineStyles: Partial<CSSStyleDeclaration> = {};
  @Input()
  defaultValue: string[] = [];
  formControl = new FormControl<string[]>([]);
  values: { name: string; id: TUUID | number | string }[] = [];

  constructor(private http: HttpClient) {}

  writeValue(value: string[] | null): void {
    this.formControl.setValue(value || this.defaultValue);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  ngOnInit(): void {
    // Initialize form control with default value
    this.formControl.setValue(this.defaultValue);

    this.getAllCategories().subscribe({
      next: (category) => {
        this.values = category;
      },
      error: (err) =>
        console.error('The error occurred while fetching data', err),
    });

    this.formControl.valueChanges.subscribe((value) => {
      this.onChange(value);
    });
  }

  getAllCategories() {
    const url = `${API_URLS.baseUrl}${CATEGORY_ENDPOINT.categories}`;
    return this.http.get<Required<ICategory>[]>(url);
  }

  private onChange: any = () => {};

  private onTouched: any = () => {};
}
