import { Component } from '@angular/core';
import { MoneyAccounts } from '../../features/money-accounts/money-accounts';
import { LayoutPage } from '../../shared/components/layout-page/layout-page.component';
import { TransactionCreatorComponent } from './components/transaction-creator/transaction-creator';

@Component({
  selector: 'app-categories',
  imports: [MoneyAccounts, LayoutPage, TransactionCreatorComponent],
  templateUrl: './root.component.html',
})
export class RootComponent {}
