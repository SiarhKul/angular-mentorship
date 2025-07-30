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
  templateUrl: './root.component.html',
  imports: [
    MoneyAccounts,
    LayoutPage,
    TransactionCreatorComponent,
    TransactionList,
    ButtonComponent,
  ],
})
export class RootComponent {
  accountId: null | number = null;

  constructor(
    protected rootService: RootService,
    private activatedRoute: ActivatedRoute,
  ) {}

  handleMoneyAccountId(id: number | null) {
    this.accountId = id;
  }

  createTransactionAction<T extends ITransaction>(
    values: T,
    callbacks: IonResponseCallbacks,
  ) {
    this.rootService.createTransactionAsync(values, callbacks);
    callbacks.onSuccess?.(null);
  }
}
