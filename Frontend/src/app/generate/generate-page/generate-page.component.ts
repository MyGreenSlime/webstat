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
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.apiService.getTaskById(params.id).subscribe(res => {
          console.log(res.detail);
          this.task = res.detail;
        });
      }
    });
  }

  generateClick() {
    //define function by task type

    // how many data per time

    // const random = require('random')
    // for (let i = 0; i<10; i++) {
    const generate = random.bernoulli();
    console.log(generate());
    // }
  }

  submitClick() {}

  resetClick() {}
}
