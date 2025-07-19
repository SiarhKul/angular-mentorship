import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../../../shared/constants/api-url';
import { TRANSACTION_ENDPOINT } from '../../../shared/constants/endpoints';
import { TUUID } from '../../../shared/types/types';
import { ITransaction } from '../types/interfaces';

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
    return this.http.get<Required<ITransaction>[]>(url);
  }

  delete(id: TUUID) {
    const url =
      `${API_URLS.baseUrl}${TRANSACTION_ENDPOINT.transactions}/${id}` as const;
    return this.http.delete<void>(url);
  }

  update(transactionId: TUUID, transaction: Required<ITransaction>) {
    const url =
      `${API_URLS.baseUrl}${TRANSACTION_ENDPOINT.transactions}/${transactionId}` as const;
    console.log(url, transaction);
    return this.http.put<void>(url, transaction);
  }
}
