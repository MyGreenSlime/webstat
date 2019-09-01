import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"]
})
export class RegisterPageComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl("", Validators.required),
    major: new FormControl("CPE", Validators.required)
  });

  major = "CPE";
  constructor() {}

  ngOnInit() {}
}
