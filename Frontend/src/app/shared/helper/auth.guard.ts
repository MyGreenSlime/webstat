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
    // case login and register
    if (route.data.roles === "login" || route.data.roles === "register") {
      if (this.cookieService.get("cookie-isa") && !this.isExpire()) {
          window.history.back();
          return false;
      }
      return true;
    }

    // case admin
    if (route.data.roles === "admin") {
      if (this.isExpire()) {
        this.router.navigate(["/login"]);
        return false;
      }
      if (atob(this.cookieService.get("cookie-isa")) === "admin") {
        return true;
      }
      this.router.navigate(["/home"]);
      return false;
    }

    // normal case
    if (this.cookieService.get("cookie-isa") && !this.isExpire()) {
      return true;
    }

    this.router.navigate(["/login"]);
    return false;
  }

  isExpire() {
    if (new Date(this.cookieService.get("exp")) < new Date()) {
      this.cookieService.deleteAll();
      return true;
    }
    return false;
  }
}
