import {
  AfterViewChecked,
  Component,
  model,
  ModelSignal,
  signal,
} from '@angular/core';
import { CategoriesCreator } from './components/categories-creator/categories-creator';
import { CategoriesListCtrl } from './components/categories-list/categories-list';
import { ICategory } from './types/interfaces';
import { CategoriesApiService } from './services/categories.api.service';
import { CategoriesService } from './services/categories.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SearchComponent } from '../../shared/components/search/search.component';

@Component({
  selector: 'app-categories',
  styleUrl: './categories.component.css',
  standalone: true,
  providers: [CategoriesApiService],
  imports: [
    CategoriesCreator,
    CategoriesListCtrl,
    ButtonComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    SearchComponent,
  ],
  template: `
    <section class="categories-container">
      @if (isLoadingSignal() && categories() == null) {
        <div>Content is loading...</div>
      }

      <section class="categories-section">
        @if (categories() !== null) {
          <app-search [categories]="categories" [filtrCat]="filtrCat" />
        }

        @if ((filtrCat() || []).length === 0) {
          <div>No categories found matching your search.</div>
        } @else {
          <app-categories-list
            [categories]="filtrCat"
            class="app-categories-list"
          />
        }
      </section>

      <app-categories-creator [submitAction]="saveCategory">
        <div ngProjectAs="alternative__trigger">
          <app-button
            [buttonContent]="'Add categories'"
            [customStyles]="{
              backgroundColor: 'var(--background-color-primary)',
              color: 'black',
              width: 'auto',
              whiteSpace: 'nowrap',
            }"
            [icon]="'savings'"
          />
        </div>
      </app-categories-creator>
    </section>
  `,
})
export class CategoriesComponent implements AfterViewChecked {
  categories = signal<Required<ICategory>[] | null>(null);
  filtrCat = signal<Required<ICategory>[] | null>(null);
  isLoadingSignal = signal(true);

  constructor(private categoriesService: CategoriesService) {
    this.categories = this.categoriesService.categoriesSignal;
    this.isLoadingSignal = this.categoriesService.isLoadingSignal;
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked', this.filtrCat());
  }

  saveCategory(
    category: ICategory,
    callbacks: {
      onSuccess?: Function;
      onError?: Function;
      onComplete?: Function;
    },
  ) {
    this.categoriesService.saveCategory(category, callbacks);
  }
}
