import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    if (this.cookieService.get("cookir-isa") === btoa("admin")) {
      this.isAdmin = true;
    }
    if (this.cookieService.get("connect.sid")) {
      this.isLoggedIn = true;
    } 
  }

  logout() {

  }
}
