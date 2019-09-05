import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../../shared/services/api.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  type: any;
  exercises: any;
  tasks: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.type) this.type = params.type;
    });
    // if (this.type === "task") {
    //   this.apiService.getTasks().subscribe(res => {
    //     this.exercises = res.data;
    //   });
    // } else {
    //   this.apiService.getExercises().subscribe(res => {
    //     this.exercises = res.data;
    //   });
    // }
    
  }

  exerciseClick(exercise) {
  }
}
