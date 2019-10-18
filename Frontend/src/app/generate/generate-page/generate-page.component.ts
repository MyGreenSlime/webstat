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
  ) { }

  exercise: any;
  task: any;
  parameters: any;
  generate: any;
  data = [];
  culTmp = [];
  tmp = [];
  aod = 0;
  noc = 0;
  indexArray = [];

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.ex && params.task) {
        this.apiService.getExercisesById(params.ex).subscribe(res => {
          // console.log("ex:", res.detail);
          this.exercise = res.detail;
        });
        this.apiService.getTaskById(params.task).subscribe(res => {
          // console.log("task:", res.detail);
          this.task = res.detail;
          this.parameters = res.detail.parameters;
          this.defineFunction(this.task.distribution.name);

        });
      }
    });
  }

  generateClick() {
    this.noc += 1;
    this.tmp = [];

    // case multiple random variables
    if (this.task.distribution.name === "multiple random variable") {
      var xArray = this.parameters[0].value;
      var yArray = this.parameters[1].value;
      if (this.data[0].length >= xArray.length) {
        return;
      }
      while (this.tmp.length < this.task.genAmount) {
        var generate = Math.floor(Math.random() * this.parameters[1].value.length);
        if (this.indexArray.indexOf(generate) === -1) {
          this.indexArray.push(generate);
          this.data[0].push(Number(xArray[generate]));
          this.data[1].push(Number(yArray[generate]));
          this.tmp.push(xArray[generate] + ", " + yArray[generate]);
        }
      }
      this.aod = this.data[0].length;
      return;
    }

    // other cases
    for (let i = 0; i < this.task.genAmount; i++) {
      var dataGen = Number(parseFloat(this.generate()).toFixed(4));
      this.data.push(dataGen);
      //case expo
      if (this.task.distribution.name === "exponential") {
        if (this.data.length - 1) {
          this.culTmp.push(Number(parseFloat(this.culTmp[this.culTmp.length - 1] + dataGen).toFixed(4)));
        } else {
          this.culTmp.push(dataGen);
        }
        this.tmp.push(Number(parseFloat(this.culTmp[this.culTmp.length - 1])).toFixed(4));
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
      case "multiple random variable": {
        this.data.push([]);
        this.data.push([]);
        this.indexArray = [];
        break;
      }
    }
  }

  submitClick() {
    this.globalService.showLoading(true);
    let params = {
      exerciseName: this.exercise.name,
      taskName: this.task.name,
      username: this.globalService.getLocalStorage("user").username,
      distribution: this.task.distribution.name,
      data: this.data
    };
    this.apiService.saveData(params).subscribe(
      res => {
        this.globalService.showLoading(false);
        console.log("save complete!");
        alert("Save Complete!");
        this.resetClick();
      },
      error => {
        this.globalService.showLoading(false);
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
    this.defineFunction(this.task.distribution.name);
  }
}
