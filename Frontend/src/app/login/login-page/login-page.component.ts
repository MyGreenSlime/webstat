import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm = new FormGroup ({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  constructor() { }

  ngOnInit() {
  }

}
