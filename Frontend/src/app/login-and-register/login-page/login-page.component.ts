import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ApiService } from "src/app/shared/services/api.service";
import { Router } from "@angular/router";
import { timeout } from "q";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  showInvalidAlert = false;
  showInvalidUser = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit() {}

  loginClick() {
    if (this.loginForm.invalid) {
      this.showInvalidAlert = true;
      setTimeout(() => {
        this.showInvalidAlert = false;
      }, 3000);
    } else {
      this.apiService.login(this.loginForm.value).subscribe(
        res => {
          if (res.data.admin) {
            this.cookieService.set('cookie-isa', btoa('admin'));
          } else {
            this.cookieService.set('cookie-isa', btoa('user'));
          }
          this.router.navigate(["/home"]);
        },
        error => {
          this.showInvalidUser = true;
          setTimeout(() => {
            this.showInvalidUser = false;
          }, 3000);
        }
      );
    }
  }
}