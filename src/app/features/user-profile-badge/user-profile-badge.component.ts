import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-user-profile-badge',
  standalone: true,
  imports: [
    MatIconModule,
  ],
  templateUrl: './user-profile-badge.component.html',
  styleUrl: './user-profile-badge.component.css'
})
export class UserProfileBadgeComponent {
  user: Record<string, string> | null = null;

  constructor(
    private userService: UserService
  ) {
    this.user = userService.user;
  }
}
