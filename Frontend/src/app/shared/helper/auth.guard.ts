import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router
} from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // case login and register
    if (route.data.roles === "login" || route.data.roles === "register") {
      if (this.authService.isLoggedIn()) {
        return false;
      }
      // window.history.back();
      return true;
    }

    // case admin
    if (route.data.roles === "admin") {
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(["/login"]);
        return false;
      }
      if (this.authService.isAdmin()) {
        return true;
      }
      this.router.navigate(["/home"]);
      return false;
    }

    // normal case
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(["/login"]);
    return false;
  }
}
