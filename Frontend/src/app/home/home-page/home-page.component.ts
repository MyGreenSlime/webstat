import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  exercises: any;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.apiService.getExercisesAll().subscribe(res => {
      this.exercises = res.detail;
      console.log(this.exercises);
    })
  }

}
