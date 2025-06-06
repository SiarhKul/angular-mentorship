import {Component, Input, Signal} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {User} from "../../shared/types/interfaces";

@Component({
  selector: 'app-user-profile-badge',
  standalone: true,
  imports: [
    MatIconModule,
  ],
  styleUrl: './user-profile-badge.component.css',
  template: `
    <span class='badge'>
      <mat-icon>account_circle</mat-icon>
      <span>{{ userSignal()?.username ?? "No name" }}</span>
    </span>
  `,
})
export class UserProfileBadgeComponent {
  @Input()
  userSignal!: Signal<User | null>;
}
