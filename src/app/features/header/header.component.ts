import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserProfileBadgeComponent } from '../user-profile-badge/user-profile-badge.component';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, UserProfileBadgeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userSignal;

  constructor(private userService: UserService) {
    this.userSignal = userService.getUserSignal();
  }
}
