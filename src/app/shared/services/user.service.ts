import {Injectable, signal} from "@angular/core";
import type {User} from "../types/interfaces";
import {getLSValue} from "../heplers/localstorage.helpers";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userSignal = signal<User | null>(null);

  constructor() {
    getLSValue<User>('user', (user: User) => this.userSignal.set(user))

  }


  setUser(user: User) {
    this.userSignal.set(user);
    this.storeToLocalStorage(user);
  }

  getUserSignal() {
    return this.userSignal;
  }

  isLoggedIn(): boolean {
    return !!this.userSignal()
  }

  storeToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

}
