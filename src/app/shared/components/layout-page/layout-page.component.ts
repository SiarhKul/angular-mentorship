import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-layout-page',
  styleUrls: ['./layout-page.component.css'],
  template: `
    <div class="layout-page">
      <ng-content select="[slot=left]" />
      <div class="layout-page__second-element">
        <ng-content select="[slot=middle]" />
      </div>
      <ng-content select="[slot=right]" />
    </div>
  `,
})
export class LayoutPage {}
