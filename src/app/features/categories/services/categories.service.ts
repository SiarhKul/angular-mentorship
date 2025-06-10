import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {ICategory} from "../types/interfaces";
import {API_URLS} from "../../../shared/constants/api-url";
import {CATEGORY_ENDPOINT} from "../../../shared/constants/endpoints";

@Injectable()
export class CategoriesService {
  private http = inject(HttpClient);

  saveCategory(category: ICategory) {
    const url = `${API_URLS.baseUrl}${CATEGORY_ENDPOINT.categories}`
    console.log("----------------------------", category)
    return this.http.post<Required<ICategory>>(url, category)

  }

}
