import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  template: `
    <article>
      <h1>Main Layout</h1>
      <router-outlet/>
    </article>
  `
})
export class MainLayout {

}
