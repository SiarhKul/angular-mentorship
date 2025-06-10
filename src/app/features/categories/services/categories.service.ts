import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {ICategory} from "../types/interfaces";

@Injectable()
export class CategoriesService {
  private http = inject(HttpClient);

  saveCategory(category: ICategory) {
    const url = ''
    console.log("----------------------------", category)
    return this.http.post(url, category)

  }

}
