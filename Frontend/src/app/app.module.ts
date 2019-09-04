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
import { exercisesManagementPageComponent } from './admin/exercises-management-page/exercises-management-page.component';
import { UsersManagementPageComponent } from './admin/users-management-page/users-management-page.component';
import { ExerciseComponent } from './admin/exercises-management-page/components/exercise/exercise.component';
import { TaskComponent } from './admin/exercises-management-page/components/task/task.component';
import { ListComponent } from './admin/exercises-management-page/components/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NavbarComponent,
    RegisterPageComponent,
    HomePageComponent,
    exercisesManagementPageComponent,
    UsersManagementPageComponent,
    ExerciseComponent,
    TaskComponent,
    ListComponent,
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
