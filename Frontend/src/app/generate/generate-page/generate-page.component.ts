import { Component, OnInit } from "@angular/core";
import * as random from "random";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/shared/services/api.service";
import { GlobalService } from "src/app/shared/services/global.service";

@Component({
  selector: "app-generate-page",
  templateUrl: "./generate-page.component.html",
  styleUrls: ["./generate-page.component.scss"]
})
export class GeneratePageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private globalService: GlobalService
  ) {}

  exercise: any;
  task: any;
  parameters: any;
  generate: any;
  data = [];
  culTmp = [];
  tmp = [];
  aod = 0;
  noc = 0;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.ex && params.task) {
        this.apiService.getExercisesById(params.ex).subscribe(res => {
          console.log("ex:", res.detail);
          this.exercise = res.detail;
        });
        this.apiService.getTaskById(params.task).subscribe(res => {
          console.log("task:", res.detail);
          this.task = res.detail;
          this.parameters = res.detail.parameters;
        });
      }
    });
  }

  generateClick() {
    this.noc += 1;
    this.defineFunction(this.task.distribution.name);
    this.tmp = [];
    for (let i = 0; i < this.task.genAmount; i++) {
      let dataGen = this.generate();
      this.data.push(dataGen);
      //case expo
      if (this.task.distribution.name === "exponential") {
        if (this.data.length - 1) {
          this.culTmp.push(this.culTmp[this.culTmp.length - 1] + dataGen);
        } else {
          this.culTmp.push(dataGen);
        }
        this.tmp.push(this.culTmp[this.culTmp.length - 1]);
      } else {
        this.tmp.push(dataGen);
      }
    }
    this.aod = this.data.length;
  }

  defineFunction(dist) {
    switch (dist) {
      case "poisson": {
        this.generate = random.poisson(this.parameters[0].value);
        break;
      }
      case "exponential": {
        this.generate = random.exponential(this.parameters[0].value);
        break;
      }
      case "normal": {
        this.generate = random.normal(
          this.parameters[0].value,
          this.parameters[1].value
        );
        break;
      }
      case "continuous uniform": {
        this.generate = random.uniform(
          this.parameters[0].value,
          this.parameters[1].value
        );
        break;
      }
      case "bernoulli": {
        this.generate = random.bernoulli(this.parameters[0].value);
        break;
      }
      case "binomial": {
        this.generate = random.binomial(
          this.parameters[0].value,
          this.parameters[1].value
        );
        break;
      }
      case "geometric": {
        this.generate = random.geometric(this.parameters[0].value);
        break;
      }
      case "discrete uniform": {
        this.generate = random.uniformInt(
          this.parameters[0].value,
          this.parameters[1].value
        );
        break;
      }
    }
  }

  submitClick() {
    let params = {
      exerciseName: this.exercise.name,
      taskName: this.task.name,
      username: this.globalService.getLocalStorage("user").username,
      distribution: this.task.distribution.name,
      data: this.data
    };
    this.apiService.saveData(params).subscribe(
      res => {
        console.log("save complete!", res.detail);
        alert("Save Complete!");
        this.resetClick();
      },
      error => {
        console.log("ERROR! Please try again!", error);
        alert("ERROR! Please try again!");
      }
    );
  }

  resetClick() {
    this.data = [];
    this.tmp = [];
    this.culTmp = [];
    this.aod = 0;
    this.noc = 0;
  }
}
