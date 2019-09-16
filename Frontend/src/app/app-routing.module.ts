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
import { GeneratePageComponent } from './generate/generate-page/generate-page.component';
import { ResultsPageComponent } from './admin/results-page/results-page.component';

import { AuthGuard } from "./shared/helper/auth.guard";
import { RoleGuard } from "./shared/helper/role.guard";


const routes: Routes = [
  {
    path: "home",
    component: HomePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "exercise",
    component: GeneratePageComponent,
    canActivate: [AuthGuard]
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
    canActivate: [RoleGuard],
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
            path: "exercise",
            component: ExerciseComponent,
          },
          {
            path: "task",
            component: TaskComponent,
          },
          { path: "", redirectTo: "list", pathMatch: "full" }
        ]
      },
      {
        path: "results",
        component: ResultsPageComponent
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
  { path: "**", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
