import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: Record<string, string> | null = null

  setUser(user: Record<string, string>) {
    this.user = user
  }
}
