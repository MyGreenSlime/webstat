import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/shared/services/global.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  exercisesAll: any;
  exercises: any;
  user: any;
  isAdmin: boolean = false;
  section: string;

  constructor(private apiService: ApiService, private router: Router, private globalService: GlobalService, private authServie: AuthService) { }

  ngOnInit() {
    this.user = this.globalService.getLocalStorage("user")
    this.isAdmin = this.authServie.isAdmin();
    this.globalService.showLoading(false);
    this.apiService.getExercisesAll().subscribe(res => {
      this.exercisesAll = res.detail;
      this.section = this.user.section.toLowerCase();
      this.selectSection(this.section);
      // console.log(this.exercisesAll)
      // console.log(this.exercises);
    })
  }

  selectSection(section) {
    this.section = section;
    this.exercises = this.exercisesAll.filter(ex => {
      // console.log(ex.section, section);
      return ex.section === section;
    })
    // console.log(this.exercises)
  } 

}
