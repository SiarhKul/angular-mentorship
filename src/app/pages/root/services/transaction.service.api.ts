import { HttpClient } from '@angular/common/http';

interface Transaction {}

export class TransactionServiceApi {
  constructor(http: HttpClient) {}

  createTransaction(transaction: any) {
    console.log(transaction);
  }
}
