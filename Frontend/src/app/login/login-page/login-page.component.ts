import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ApiService } from "src/app/shared/services/api.service";

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

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  loginClick() {
    if (this.loginForm.invalid) {
      this.showInvalidAlert = true;
      setTimeout(() => {
        this.showInvalidAlert = false;
      }, 3000);
    } else {
      this.apiService.login(this.loginForm.value).subscribe(res => {
      });
    }
  }
}
