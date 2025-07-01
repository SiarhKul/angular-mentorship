import { Injectable, signal } from '@angular/core';
import { CategoriesApiService } from './categories.api.service';
import { ICategory } from '../types/interfaces';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
  useFactory: () => new CategoriesService(new CategoriesApiService()),
})
export class CategoriesService {
  categoriesSignal = signal<Required<ICategory>[] | null>(null);
  isLoadingSignal = signal(false);
  filteredCategoriesSignal = signal<Required<ICategory>[] | null>(null);
  submitted = false;
  error = '';

  constructor(private apiService: CategoriesApiService) {
    this.fetchCategories();
  }

  saveCategory(
    category: ICategory,
    callbacks: {
      onSuccess?: Function;
      onError?: Function;
      onComplete?: Function;
    },
  ) {
    this.apiService.saveCategory(category).subscribe({
      next: (categories) => {
        this.fetchCategories();
        callbacks.onSuccess?.(categories);
      },
      error: (error) => {
        this.error = 'Error creating category';
        this.submitted = false;
        callbacks.onError?.(error);
      },
      complete: () => {
        callbacks.onComplete?.();
      },
    });
  }

  deleteCategory(
    id: string,
    callbacks?: { onSuccess?: Function; onError?: Function },
  ) {
    this.apiService.deleteCategory(id).subscribe({
      next: (categories) => {
        this.fetchCategories();
        callbacks?.onSuccess?.(categories);
      },
      error: (error) => {
        callbacks?.onError?.(error);
      },
    });
  }

  changeSearchTerm(searchTerm: string) {
    console.log('searchTerm', searchTerm);

    const categories = this.categoriesSignal();
    if (!categories) return null;

    let filter = categories.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (searchTerm === '') {
      filter = categories;
    }
    this.filteredCategoriesSignal.set(filter);
    console.log('Filtered', filter);
    return filter;
  }

  updateCategory(
    category: Required<ICategory>,
    callbacks: {
      onSuccess?: Function;
      onError?: Function;
      onComplete?: Function;
    },
  ) {
    this.apiService
      .updateCategory(category)
      .pipe(switchMap(() => this.apiService.getAllCategories()))
      .subscribe({
        next: (categories) => {
          this.categoriesSignal.set(categories);
          callbacks.onSuccess?.(categories);
        },
        error: (error) => {
          this.error = 'Error creating category';
          this.submitted = false;
          callbacks.onError?.(error);
        },
        complete: () => {
          callbacks.onComplete?.();
        },
      });
  }

  private fetchCategories() {
    this.submitted = true;
    this.error = '';
    this.isLoadingSignal.set(true);
    this.apiService.getAllCategories().subscribe({
      next: (categories) => {
        this.categoriesSignal.set(categories);
      },
      error: () => {
        this.submitted = true;
        this.error = 'Error fetching categories';
      },
      complete: () => {
        this.isLoadingSignal.set(false);
      },
    });
  }
}
