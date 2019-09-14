import { Component, OnInit } from "@angular/core";
import * as random from "random";

@Component({
  selector: "app-generate-page",
  templateUrl: "./generate-page.component.html",
  styleUrls: ["./generate-page.component.scss"]
})
export class GeneratePageComponent implements OnInit {
  constructor() {}

  test: any = [];
  ngOnInit() {
    // get task type by task id
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
