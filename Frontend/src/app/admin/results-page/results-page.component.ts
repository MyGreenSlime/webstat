import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/shared/services/api.service";

@Component({
  selector: "app-results-page",
  templateUrl: "./results-page.component.html",
  styleUrls: ["./results-page.component.scss"]
})
export class ResultsPageComponent implements OnInit {
  exercises: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getExercisesAll().subscribe(res => {
      this.exercises = res.detail;
    })
  }
}
