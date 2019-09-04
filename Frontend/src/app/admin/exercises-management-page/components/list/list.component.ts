import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../../shared/services/api.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  exercises: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getExercise().subscribe(res => {
      this.exercises = res.data;
    });
  }
}
