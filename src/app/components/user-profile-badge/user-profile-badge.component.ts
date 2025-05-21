import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

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

}
