import {Injectable, signal} from "@angular/core";
import {User} from "../types/interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userSignal = signal<User | null>(null);

  setUser(user: User) {
    this.userSignal.set(user);
  }

  getUserSignal() {
    return this.userSignal;
  }
}
