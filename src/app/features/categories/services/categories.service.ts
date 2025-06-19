import { Injectable, signal } from '@angular/core';
import { CategoriesApiService } from './categories.api.service';
import { switchMap } from 'rxjs';
import { ICategory } from '../types/interfaces';

@Injectable()
export class CategoriesService {
  categoriesSignal = signal<Required<ICategory>[] | null>(null);
  isLoadingSignal = signal(false);
  submitted = false;
  loading = false;
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

  updateCategory(category: Required<ICategory>, callbacks?: {}) {
    this.apiService.updateCategory(category);
  }

  private fetchCategories() {
    this.loading = true;
    this.submitted = true;
    this.error = '';
    this.isLoadingSignal.set(true);
    this.apiService.getAllCategories().subscribe({
      next: (categories) => {
        console.log('111', categories);
        this.categoriesSignal.set(categories);
      },
      error: () => {
        console.log('Error creating category');
        this.submitted = true;
        this.error = 'Error fetching categories';
      },
      complete: () => {
        console.log('222');
        this.loading = false;
        this.isLoadingSignal.set(false);
      },
    });
  }

  private setLoadingState(state: boolean) {
    this.loading = state;
    this.submitted = state;
    this.error = state ? '' : this.error;
  }
}
