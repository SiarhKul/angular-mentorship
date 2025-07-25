import { Component } from '@angular/core';
import { MoneyAccounts } from '../../features/money-accounts/money-accounts';
import { LayoutPage } from '../../shared/components/layout-page/layout-page.component';
import { TransactionCreatorComponent } from './components/transaction-creator/transaction-creator';
import { TransactionList } from './components/transaction-list/transaction-list';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ITransaction } from './types/interfaces';
import { IonResponseCallbacks } from '../../shared/types/types';
import { RootService } from './root.service';

@Component({
  selector: 'app-categories',
  imports: [
    MoneyAccounts,
    LayoutPage,
    TransactionCreatorComponent,
    TransactionList,
    ButtonComponent,
  ],
  templateUrl: './root.component.html',
})
export class RootComponent {
  constructor(private rootService: RootService) {}
  createTransactionAction<T extends ITransaction>(
    values: T,
    callbacks: IonResponseCallbacks,
  ) {
    this.rootService.createTransactionAsync(values, callbacks);
    callbacks.onSuccess?.(null);
  }
}
