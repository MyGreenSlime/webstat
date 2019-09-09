import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: "root"
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const currentUser = this.currentUserValue;
    if (atob(this.cookieService.get("cookie-isa")) === "admin") {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(["/home"]);
    return false;
  }
}
