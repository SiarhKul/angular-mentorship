import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { DrawerComponent } from '../../../shared/components/drawer/drawer.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-transaction-creator',
  template: `
    <app-drawer [textHeader]="'Create transaction'">
      <div ngProjectAs="drawer__content">
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </div>

      <footer ngProjectAs="footer__buttons">
        <button form="create-category" mat-stroked-button type="button">
          Save
        </button>
      </footer>

      <div ngProjectAs="alternative__trigger">
        <app-button
          [buttonContent]="'Create transaction'"
          [customStyles]="{
            backgroundColor: 'var(--background-color-primary-dark)',
            color: 'black',
            width: 'auto',
            whiteSpace: 'nowrap',
          }"
          [icon]="'add'"
        />
      </div>
    </app-drawer>
  `,
  standalone: true,
  imports: [DrawerComponent, MatButton, ButtonComponent],
})
export class TransactionCreatorComponent {}
