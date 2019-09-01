import { Component } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(
    private cookieService: CookieService,
  ) {
    this.cookieHandler();
  }

  cookieHandler() {
    let cookies = this.cookieService.getAll()
    console.log(JSON.stringify(cookies));
  }
}
