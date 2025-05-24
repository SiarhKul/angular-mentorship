import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URLS} from "../../shared/constants/api-url";
import {AUTH_ENDPOINT} from "../../shared/constants/endpoints";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    const url = `${API_URLS.baseUrl}${AUTH_ENDPOINT.login}`;

    let objectObservable = this.http.post(url, {
      username,
      password
    });

    return objectObservable;
  }
}
