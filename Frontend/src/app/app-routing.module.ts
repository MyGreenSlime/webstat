import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from "./login-and-register/login-page/login-page.component";
import { RegisterPageComponent } from "./login-and-register/register-page/register-page.component";
import { HomePageComponent } from "./home/home-page/home-page.component";
import { ExcercisesManagementPageComponent } from "./admin/excercises-management-page/excercises-management-page.component";
import { UsersManagementPageComponent } from "./admin/users-management-page/users-management-page.component";

const routes: Routes = [
  {
    path: "home",
    component: HomePageComponent
  },
  {
    path: "login",
    component: LoginPageComponent
  },
  {
    path: "register",
    component: RegisterPageComponent
  },
  {
    path: "admin",
    children: [
      {
        path: "excercises",
        component: ExcercisesManagementPageComponent
      },
      {
        path: "users",
        component: UsersManagementPageComponent
      },
      {
        path: "",
        redirectTo: "excercises",
        pathMatch: "full"
      }
    ]
  },
  { path: "", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
