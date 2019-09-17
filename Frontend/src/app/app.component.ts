import { Component } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {
    this.cookieHandler();
  }

  cookieHandler() {
    let cookies = this.cookieService.get('cookie-isa')
    if(!cookies) {
      this.router.navigate(["login"]);
      return;
    }
  }
}
