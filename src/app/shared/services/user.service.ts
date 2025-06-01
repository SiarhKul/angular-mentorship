import {Injectable} from "@angular/core";
import {User} from "../types/interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User | null = null
  
  setUser(user: User) {
    this.user = user
  }

  getUser() {
    return this.user;
  }
}
