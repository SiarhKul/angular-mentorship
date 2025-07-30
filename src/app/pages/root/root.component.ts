import { Component, OnInit } from '@angular/core';
import { MoneyAccounts } from '../../features/money-accounts/money-accounts';
import { LayoutPage } from '../../shared/components/layout-page/layout-page.component';
import { TransactionCreatorComponent } from './components/transaction-creator/transaction-creator';
import { TransactionList } from './components/transaction-list/transaction-list';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ITransaction } from './types/interfaces';
import { IonResponseCallbacks } from '../../shared/types/types';
import { RootService } from './root.service';
import { ActivatedRoute, Params } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [
    MoneyAccounts,
    LayoutPage,
    TransactionCreatorComponent,
    TransactionList,
    ButtonComponent,
    JsonPipe,
  ],
  templateUrl: './root.component.html',
})
export class RootComponent implements OnInit {
  accountId: null | number = null;

  constructor(
    protected rootService: RootService,
    private activatedRoute: ActivatedRoute,
  ) {}

  handleMoneyAccountId(id: number | null) {
    this.accountId = id;
  }

  ngOnInit(): void {
    this.accountId = this.extractMoneyAccountId(
      this.activatedRoute.snapshot.queryParams,
    );
  }

  createTransactionAction<T extends ITransaction>(
    values: T,
    callbacks: IonResponseCallbacks,
  ) {
    this.rootService.createTransactionAsync(values, callbacks);
    callbacks.onSuccess?.(null);
  }

  private extractMoneyAccountId(params: Params) {
    if ('moneyAccountId' in params) {
      return (this.accountId = Number(
        this.activatedRoute.snapshot.queryParams['moneyAccountId'],
      ));
    }
    return null;
  }
}
