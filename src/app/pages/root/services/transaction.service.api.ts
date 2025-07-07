import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../../../shared/constants/api-url';
import {
  ACCOUNT_MONEY_ENDPOINT,
  TRANSACTION_ENDPOINT,
} from '../../../shared/constants/endpoints';

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

    this.http.post(url, { test1: 'test' });

    // this.http.get<any>(url, transaction).subscribe({
    //   next: (data: any) => {
    //     console.log('Transaction created successfully:', data);
    //   },
    // });
    // console.log(transaction);
  }
}
