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
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let now = new Date();
    if (new Date(this.cookieService.get("exp")) < now) {
      this.cookieService.deleteAll();
      this.router.navigate(["/login"]);
      return false;
    }

    if (atob(this.cookieService.get("cookie-isa")) === "admin") {
      return true;
    }

    this.router.navigate(["/home"]);
    return false;
  }
}
