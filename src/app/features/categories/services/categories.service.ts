import { Injectable, signal } from '@angular/core';
import { CategoriesApiService } from './categories.api.service';
import { Observable, switchMap } from 'rxjs';
import { ICategory } from '../types/interfaces';

@Injectable()
export class CategoriesService {
  categoriesSignal = signal<Required<ICategory>[] | null>(null);
  submitted = false;
  loading = false;
  error = '';

  constructor(private cs: CategoriesApiService) {
    this.cs.getAllCategories().subscribe({
      next: (categories) => {
        console.log('Categories fetched successfully:', categories);
        this.categoriesSignal.set(categories);
      },
      error: (error: unknown) => {
        console.error('Error fetching categories:', error);
        this.error = 'Error fetching categories';
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  handleOnSuccessSubmit(
    category: ICategory,
    props: { onSuccess?: Function; onError?: Function; onComplete?: Function },
  ) {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    this.cs
      .saveCategory(category)
      .pipe(switchMap(() => this.cs.getAllCategories()))
      .subscribe({
        next: (categories) => {
          console.log('Categories fetched successfully:', categories);
          this.categoriesSignal.set(categories);
          props.onSuccess?.(categories);
        },
        error: (error: unknown) => {
          props.onError?.(error);
          this.error = 'Error creating category';
          this.submitted = false;
        },
        complete: () => {
          props.onComplete?.();
          this.loading = false;
        },
      });
  }

  handleOnDelete(
    id: number,
    props: { onSuccess?: Function; onError?: Function },
  ) {
    this.cs
      .deleteCategory(id)
      .pipe(switchMap(() => this.cs.getAllCategories()))
      .subscribe({
        next: (categories) => {
          this.categoriesSignal.set(categories);
          props.onSuccess?.(categories);
        },
        error: (error) => {
          props.onError?.(error);
        },
        complete: () => {},
      });
  }
}
