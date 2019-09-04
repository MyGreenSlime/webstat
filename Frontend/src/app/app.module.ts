import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-and-register/login-page/login-page.component';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { RegisterPageComponent } from './login-and-register/register-page/register-page.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { ExcercisesManagementPageComponent } from './admin/excercises-management-page/excercises-management-page.component';
import { UsersManagementPageComponent } from './admin/users-management-page/users-management-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NavbarComponent,
    RegisterPageComponent,
    HomePageComponent,
    ExcercisesManagementPageComponent,
    UsersManagementPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
