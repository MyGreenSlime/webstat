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
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
      if (this.authService.isAdmin()) {
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
