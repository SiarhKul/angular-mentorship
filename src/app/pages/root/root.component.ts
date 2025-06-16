import { Component } from '@angular/core';
import { MoneyAccounts } from '../../features/money-accounts/money-accounts';
import { AccountMoneyService } from '../../features/money-accounts/services/api/account-money.service';

@Component({
  selector: 'app-categories',
  imports: [MoneyAccounts],
  templateUrl: './root.component.html',
  providers: [AccountMoneyService],
})
export class RootComponent {}
