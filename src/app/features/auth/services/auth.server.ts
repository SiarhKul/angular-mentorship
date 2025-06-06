import {Injectable} from "@angular/core";
import {CanActivate, Router} from '@angular/router';
import {UserService} from "../../../shared/services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
  }

  async canActivate() {
    if (this.userService.isLoggedIn()) {
      return true;
    }

    await this.router.navigate(['/auth/login']);
    return false;
  }

}
