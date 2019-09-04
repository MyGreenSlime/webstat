import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ApiService } from "src/app/shared/services/api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"]
})
export class RegisterPageComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl("", Validators.required),
    fullname: new FormControl("", Validators.required),
    section: new FormControl("CPE", Validators.required)
  });

  section = "CPE";
  showInvalidAlert = false;
  showInvalidError = false;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {}

  registerClick() {
    if (this.registerForm.invalid) {
      this.showInvalidAlert = true;
      setTimeout(() => {
        this.showInvalidAlert = false;
      }, 3000);
    } else {
      this.apiService.register(this.registerForm.value).subscribe(
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
