import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ApiService } from "src/app/shared/services/api.service";

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

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  registerClick() {
    if (this.registerForm.invalid) {
      this.showInvalidAlert = true;
      setTimeout(() => {
        this.showInvalidAlert = false;
      }, 3000);
    } else {
      this.apiService
        .register(this.registerForm.value)
        .subscribe(res => {}, error => {});
    }
  }
}
