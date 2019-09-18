import {
  Component,
  OnInit,
  AfterContentInit,
  AfterViewInit,
  OnChanges
} from "@angular/core";
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

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.type) this.type = params.type;
      if (this.type === "task") {
        this.apiService.getTasksAll().subscribe(res => {
          // console.log(res.detail);
          this.tasks = res.detail;
        });
      } else {
        this.apiService.getExercisesAll().subscribe(res => {
          // console.log(res.detail);
          this.exercises = res.detail;
        });
      }
    });
  }

  changeDisable(e, x, type) {
    let param = {
      disable: e.target.checked
    }
    if (type === "ex") {
      this.apiService.editExercise(x._id, param).subscribe(res => {
        console.log("change exercise disable success!");
      })
    } else if (type === "task") {
      this.apiService.editTask(x._id, param).subscribe(res => {
        console.log("change task disable success!");
      })
    }
  }

}
