import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-landing-layout',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  template: `
    <article>
      <h1>Landing</h1>
      <router-outlet/>
    </article>
  `
})
export class LandingLayout {

}
