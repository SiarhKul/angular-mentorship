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
        console.log('Updated categories:', categories);

        this.categoriesSignal.set(categories);
      },
      error: () => {
        console.log('Error creating category');
        this.submitted = true;
        this.error = 'Error fetching categories';
      },
      complete: () => {
        this.isLoadingSignal.set(false);
      },
    });
  }
}
