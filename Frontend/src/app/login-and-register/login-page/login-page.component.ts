import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ApiService } from "../../shared/services/api.service";
import { Router } from "@angular/router";
import { timeout } from "q";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from 'src/app/shared/services/auth.service';
import { GlobalService } from 'src/app/shared/services/global.service';

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
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    // if (this.authService.isLoggedIn()) {
    //   this.authService.logout().subscribe(res => {
    //     this.cookieService.deleteAll();
    //   })
    // }
  }

  loginClick() {
    if (this.loginForm.invalid) {
      this.showInvalidAlert = true;
      setTimeout(() => {
        this.showInvalidAlert = false;
      }, 3000);
    } else {
      this.authService.login(this.loginForm.value).subscribe(
        res => {
          console.log(res)
          let user = {
            username: res.detail.user.username,
            fullName: res.detail.user.fullName,
            section: res.detail.user.section
          }
          this.globalService.setLocalStorage('user', JSON.stringify(user));
          this.cookieService.set('exp', res.detail.sessionExpire);
          if (res.detail.user.admin) {
            this.cookieService.set('cookie-isa', btoa("admin"));
          } else {
            this.cookieService.set('cookie-isa', btoa("user"));
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
