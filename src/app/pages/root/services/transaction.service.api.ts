import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../../../shared/constants/api-url';
import { TRANSACTION_ENDPOINT } from '../../../shared/constants/endpoints';

interface Transaction {}

export class TransactionServiceApi {
  constructor(private http: HttpClient) {}

  createTransaction(transaction: any) {
    const url =
      `${API_URLS.baseUrl}${TRANSACTION_ENDPOINT.transactions}` as const;

    console.log('11', {
      url,
      transaction,
    });

    return this.http.post<any>(url, transaction);
  }
}
