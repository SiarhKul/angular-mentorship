import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../../../../shared/constants/api-url';
import { AUTH_ENDPOINT } from '../../../../shared/constants/endpoints';
import { User } from '../../../../shared/types/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const url = `${API_URLS.baseUrl}${AUTH_ENDPOINT.login}`;

    return this.http.post<User>(url, {
      username,
      password,
    });
  }
}
