import { Component } from '@angular/core';
import { MoneyAccounts } from '../../features/money-accounts/money-accounts';
import { AccountMoneyServiceApi } from '../../features/money-accounts/services/api/account-money-service-api.service';
import { LayoutPage } from '../../shared/components/layout-page/layout-page.component';

@Component({
  selector: 'app-categories',
  imports: [MoneyAccounts, LayoutPage],
  templateUrl: './root.component.html',
  providers: [AccountMoneyServiceApi],
})
export class RootComponent {}
