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
        return this.http.post<Required<ICategory>>(url, category)
    }

    getAllCategories() {
        const url = `${API_URLS.baseUrl}${CATEGORY_ENDPOINT.categories}`
        return this.http.get<Required<ICategory>[]>(url);
    }

    deleteCategory(categoryId: number) {
        const url = `${API_URLS.baseUrl}${CATEGORY_ENDPOINT.categories}/${categoryId}`;
        return this.http.delete(url);
    }

}
