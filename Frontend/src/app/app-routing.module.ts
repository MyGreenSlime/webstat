import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from "./login-and-register/login-page/login-page.component";
import { RegisterPageComponent } from "./login-and-register/register-page/register-page.component";
import { HomePageComponent } from "./home/home-page/home-page.component";
import { exercisesManagementPageComponent } from './admin/exercises-management-page/exercises-management-page.component';
import { UsersManagementPageComponent } from './admin/users-management-page/users-management-page.component';
import { ExerciseComponent } from './admin/exercises-management-page/components/exercise/exercise.component';
import { TaskComponent } from './admin/exercises-management-page/components/task/task.component';
import { ListComponent } from './admin/exercises-management-page/components/list/list.component';


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
        path: "ex",
        component: exercisesManagementPageComponent,
        children: [
          {
            path: "list",
            component: ListComponent,
          },
          {
            path: "addex",
            component: ExerciseComponent,
          },
          {
            path: "addtask",
            component: TaskComponent,
          },
          { path: "", redirectTo: "list", pathMatch: "full" }
        ]
      },
      {
        path: "users",
        component: UsersManagementPageComponent
      },
      {
        path: "",
        redirectTo: "ex",
        pathMatch: "full"
      }
    ]
  },
  { path: "*", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
