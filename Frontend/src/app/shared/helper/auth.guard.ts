import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const currentUser = this.currentUserValue;
    if (this.cookieService.get("connect.sid")) {
      let now = new Date();
      if (new Date(this.cookieService.get("exp")) < now) {
        return false;
      }
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(["/login"]);
    return false;
  }
}
