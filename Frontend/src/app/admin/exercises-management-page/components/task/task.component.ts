import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"]
})
export class TaskComponent implements OnInit {
  distributions = [
    "Bernoulli",
    "Bivariate normal",
    "Binomial",
    "Continuous Uniform",
    "Discrete Uniform",
    "Exponential",
    "Geometric",
    "Normal",
    "Poisson"
  ];

  distribution = "Bernoulli";

  taskForm: any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      title: ["", Validators.required],
      name: ["", Validators.required],
      distribution: ["Bernoulli", Validators.required],
      disable: [false, Validators.required]
    });
  }
}
