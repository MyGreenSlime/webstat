import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private cookieService: CookieService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.cookieService.get("cookie-isa")) {
      this.isLoggedIn = true;
      if (atob(this.cookieService.get("cookie-isa")) === "admin") {
        this.isAdmin = true;
      }
    } 
  }

  logout() {
    this.authService.logout().subscribe(res => {
      this.cookieService.deleteAll();
      this.router.navigate(['/login']);
    });
  }
}
