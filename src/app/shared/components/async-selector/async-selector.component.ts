import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgStyle } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
  template: `
    <mat-form-field [ngStyle]="inlineStyles" appearance="outline">
      <mat-label>Toppings</mat-label>
      <mat-select [formControl]="toppings" multiple>
        <mat-select-trigger>
          {{ toppings.value?.[0] || '' }}
          @if ((toppings.value?.length || 0) > 1) {
            <span class="example-additional-selection">
              (+{{ (toppings.value?.length || 0) - 1 }}
              {{ toppings.value?.length === 2 ? 'other' : 'others' }})
            </span>
          }
        </mat-select-trigger>
        @for (topping of toppingList; track topping) {
          <mat-option [value]="topping">{{ topping }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
})
export class AsyncSelectorComponent implements OnInit {
  @Input()
  inlineStyles: Partial<CSSStyleDeclaration> = {};
  toppings = new FormControl('');
  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<string[]>('https://example.com/toppings').subscribe({
      next: (toppings) => (this.toppingList = toppings),
      error: (err) => console.error('Ошибка загрузки топпингов:', err),
    });
  }
}
