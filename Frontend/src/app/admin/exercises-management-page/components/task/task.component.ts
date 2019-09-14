import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormArray, FormGroup } from "@angular/forms";
import { ApiService } from "src/app/shared/services/api.service";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"]
})
export class TaskComponent implements OnInit {
  distributions: any;

  distribution = "";

  taskForm: any;
  parameters: any;
  parameterForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      title: ["", Validators.required],
      name: ["", Validators.required],
      distribution: ["Bernoulli", Validators.required],
      genamount: [Number, Validators.required],
      parameters: this.formBuilder.array([]),
      disable: [false, Validators.required]
    });
    this.apiService.getDistributionAll().subscribe(res => {
      this.distributions = res.detail;
      this.apiService.getDistribution(res.detail[0].name).subscribe(res => {
        console.log(res.detail);
        this.parameters = res.detail.parameters;
        this.createParam();
      });
    });
  }

  createParam() {
    for (let i = 0; i < this.parameters.length; i++) {
      this.taskForm.controls.parameters.push(
        this.formBuilder.group({
          name: [this.parameters[i].name, Validators.required],
          value: [Number, Validators.required]
        })
      );
    }
  }

  changeDist(e) {
    this.apiService.getDistribution(e.target.value).subscribe(res => {
      console.log(res.detail);
      this.parameters = res.detail.parameters;
      this.createParam();
      this.taskForm.controls.distribution.setValue(res.detail._id);
    });
  }

  saveClick() {
    console.log(this.taskForm.value);
    this.apiService.createTask(this.taskForm.value).subscribe(res => {
      console.log("task added!");
    });
  }

  deleteClick() {}
}
