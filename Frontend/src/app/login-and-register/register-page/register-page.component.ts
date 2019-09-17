import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from 'src/app/shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"]
})
export class RegisterPageComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl("", Validators.required),
    fullName: new FormControl("", Validators.required),
    section: new FormControl("CPE", Validators.required)
  });

  section = "CPE";
  showInvalidAlert = false;
  showInvalidError = false;

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) {}

  ngOnInit() {
    // if (this.authService.isLoggedIn()) {
    //   this.authService.logout().subscribe(res => {
    //     this.cookieService.deleteAll();
    //   })
    // }
  }

  registerClick() {
    if (this.registerForm.invalid) {
      this.showInvalidAlert = true;
      setTimeout(() => {
        this.showInvalidAlert = false;
      }, 3000);
    } else {
      this.authService.register(this.registerForm.value).subscribe(
        res => {
          this.router.navigate(["/login"]);
        },
        error => {
          this.showInvalidError = true;
          setTimeout(() => {
            this.showInvalidError = false;
          }, 3000);
        }
      );
    }
  }
}
