import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';

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

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  loginClick() {
    let param = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }
    this.apiService.login(param).subscribe(res => {
      console.log(res);
    });
  }

}
