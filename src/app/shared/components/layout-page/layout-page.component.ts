import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-layout-page',
  styleUrls: ['./layout-page.component.css'],
  template: `
    <div class="layout-page">
      <ng-content select="[slot=money-accounts]" />
      <div class="layout-page__second-element">
        <ng-content select="[slot=transaction]" />
      </div>
      <ng-content select="[slot=controls]" />
    </div>
  `,
})
export class LayoutPage {}
