import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private cookieService: CookieService, private authService: AuthService) {}

  ngOnInit() {
    console.log(this.cookieService.get("cookie-isa"))
    if (atob(this.cookieService.get("cookie-isa")) === "admin") {
      this.isAdmin = true;
    }
    if (this.cookieService.get("connect.sid")) {
      this.isLoggedIn = true;
    } 
  }

  logout() {
    this.authService.logout();
    this.cookieService.deleteAll();
  }
}
