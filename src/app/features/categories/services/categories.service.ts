import { Injectable, signal } from '@angular/core';
import { CategoriesApiService } from './categories.api.service';
import { Observable, switchMap } from 'rxjs';
import { ICategory } from '../types/interfaces';

@Injectable()
export class CategoriesService {
  categSignal = signal<Required<ICategory>[] | null>(null);
  categories$: Observable<Required<ICategory>[]>;
  submitted = false;
  loading = false;
  error = '';

  constructor(private cs: CategoriesApiService) {
    this.categories$ = this.cs.getAllCategories();
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
      .subscribe((categories) => {
        this.categSignal.set(categories);
      });
  }

  handleOnSuccessSubmit1(
    category: ICategory,
    props: { onSuccess?: Function; onError?: Function; onComplete?: Function },
  ) {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    this.cs.saveCategory(category).subscribe({
      next: (response) => {
        props.onSuccess?.(response);
        this.categories$ = this.cs.getAllCategories();
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
    //todo: use pipes for refetching.switchMap

    // this.categories$ = this.cs.getAllCategories();
  }
}
