import { Injectable, signal } from '@angular/core';
import { CategoriesApiService } from './categories.api.service';
import { switchMap } from 'rxjs';
import { ICategory } from '../types/interfaces';

@Injectable()
export class CategoriesService {
  categoriesSignal = signal<Required<ICategory>[] | null>(null);
  submitted = false;
  loading = false;
  error = '';

  constructor(private apiService: CategoriesApiService) {
    this.fetchCategories();
  }

  private fetchCategories() {
    this.apiService.getAllCategories().subscribe({
      next: (categories) => {
        this.categoriesSignal.set(categories);
        this.error = '';
      },
      error: () => {
        this.error = 'Error fetching categories';
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  saveCategory(
    category: ICategory,
    callbacks: {
      onSuccess?: Function;
      onError?: Function;
      onComplete?: Function;
    },
  ) {
    this.setLoadingState(true);
    this.apiService
      .saveCategory(category)
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
          this.setLoadingState(false);
          callbacks.onComplete?.();
        },
      });
  }

  deleteCategory(
    id: number,
    callbacks?: { onSuccess?: Function; onError?: Function },
  ) {
    this.apiService
      .deleteCategory(id)
      .pipe(switchMap(() => this.apiService.getAllCategories()))
      .subscribe({
        next: (categories) => {
          this.categoriesSignal.set(categories);
          callbacks?.onSuccess?.(categories);
        },
        error: (error) => {
          callbacks?.onError?.(error);
        },
      });
  }

  private setLoadingState(state: boolean) {
    this.loading = state;
    this.submitted = state;
    this.error = state ? '' : this.error;
  }
}
