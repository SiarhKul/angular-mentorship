import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../../../shared/constants/api-url';
import { TRANSACTION_ENDPOINT } from '../../../shared/constants/endpoints';
import { TUUID } from '../../../shared/types/types';

interface Transaction {}

export class TransactionServiceApi {
  constructor(private http: HttpClient) {}

  createTransaction(transaction: any) {
    const url =
      `${API_URLS.baseUrl}${TRANSACTION_ENDPOINT.transactions}` as const;

    return this.http.post<any>(url, transaction);
  }

  getTransactions() {
    const url =
      `${API_URLS.baseUrl}${TRANSACTION_ENDPOINT.transactions}` as const;
    return this.http.get<Transaction[]>(url);
  }

  delete(id: TUUID) {
    console.log('delete transaction', id);
    const url =
      `${API_URLS.baseUrl}${TRANSACTION_ENDPOINT.transactions}/${id}` as const;
    return this.http.delete<Transaction[]>(url);
  }
}
