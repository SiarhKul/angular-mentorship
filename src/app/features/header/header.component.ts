import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {
  UserProfileBadgeComponent
} from '../user-profile-badge/user-profile-badge.component';
import {User} from "../../shared/types/interfaces";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    UserProfileBadgeComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userInfo: User | null;

  constructor(
    private userService: UserService
  ) {
    this.userInfo = userService.getUser();
  }


}
