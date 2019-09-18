import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { ErrorInterceptor } from "./shared/helper/error.interceptor";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AccordionModule } from "ngx-bootstrap/accordion";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginPageComponent } from "./login-and-register/login-page/login-page.component";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { RegisterPageComponent } from "./login-and-register/register-page/register-page.component";
import { HomePageComponent } from "./home/home-page/home-page.component";
import { exercisesManagementPageComponent } from "./admin/exercises-management-page/exercises-management-page.component";
import { UsersManagementPageComponent } from "./admin/users-management-page/users-management-page.component";
import { ExerciseComponent } from "./admin/exercises-management-page/components/exercise/exercise.component";
import { TaskComponent } from "./admin/exercises-management-page/components/task/task.component";
import { ListComponent } from "./admin/exercises-management-page/components/list/list.component";
import { GeneratePageComponent } from "./generate/generate-page/generate-page.component";
import { ResultsPageComponent } from "./admin/results-page/results-page.component";
import { ResultListComponent } from "./admin/results-page/components/result-list/result-list.component";

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
    GeneratePageComponent,
    ResultsPageComponent,
    ResultListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
