import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-layout-page',
  styleUrls: ['./layout-page.component.css'],
  template: `
    <div class="layout-page">
      <div class="layout-page__left">
        <ng-content select="[slot=left]" />
      </div>
      <div class="layout-page__middle">
        <ng-content select="[slot=middle]" />
      </div>
      <div class="layout-page__right">
        <ng-content select="[slot=right]" />
      </div>
    </div>
  `,
})
export class LayoutPage {}
