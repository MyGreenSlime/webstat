import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  exercises: any;
  user: any;

  constructor(private apiService: ApiService, private router: Router, private globalService: GlobalService) { }

  ngOnInit() {
    this.apiService.getExercisesAll().subscribe(res => {
      this.exercises = res.detail;
      console.log(this.exercises);
    })

    this.user = this.globalService.getLocalStorage("user")
  }

}
