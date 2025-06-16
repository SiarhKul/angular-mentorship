import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <article>
      <h1>Auth Layout</h1>
      <router-outlet />
    </article>
  `,
})
export class AuthLayout {}
