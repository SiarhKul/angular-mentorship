import { Injectable } from '@angular/core';
import { CategoriesApiService } from './categories.api.service';
import { Observable } from 'rxjs';
import { ICategory } from '../types/interfaces';

@Injectable()
export class CategoriesService {
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
    this.cs.saveCategory(category).subscribe({
      next: (response) => {
        props.onSuccess?.(response);
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

    this.categories$ = this.cs.getAllCategories();
  }
}
