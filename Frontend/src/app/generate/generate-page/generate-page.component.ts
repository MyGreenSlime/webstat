import { Component, OnInit } from "@angular/core";
import * as random from "random";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/shared/services/api.service";

@Component({
  selector: "app-generate-page",
  templateUrl: "./generate-page.component.html",
  styleUrls: ["./generate-page.component.scss"]
})
export class GeneratePageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  task: any;
  parameters: any;
  generate: any;
  data = [];
  tmp: any;
  start: number;
  end: number;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.apiService.getTaskById(params.id).subscribe(res => {
          console.log(res.detail);
          this.task = res.detail;
          this.parameters = res.detail.parameters;
          this.start = 0;
          this.end = res.detail.genamount;
        });
      }
    });
  }

  generateClick() {
    this.defineFunction(this.task.distribution.name);
    this.tmp = [];
    for (let i = 0; i < this.task.genamount; i++) {
      let dataGen = this.generate();
      this.data.push(dataGen);
      this.tmp.push(dataGen);
    }
    console.log(this.tmp);
  }

  defineFunction(dist) {
    switch (dist) {
      case "poisson":
        this.generate = random.poisson(this.parameters[0].value);
    }
  }

  submitClick() {}

  resetClick() {
    this.data = [];
    this.tmp = [];
  }
}
