import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormArray } from "@angular/forms";
import { ApiService } from "src/app/shared/services/api.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"]
})
export class TaskComponent implements OnInit {
  distributions: any;

  distribution = "bernoulli";

  taskForm: any;
  parameters: any;
  parameterForm: any;

  task: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.formBuilder.group({
      title: ["", Validators.required],
      name: ["", Validators.required],
      distribution: ["bernoulli", Validators.required],
      genamount: [Number, Validators.required],
      parameters: this.formBuilder.array([]),
      disable: [true, Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.apiService.getTaskById(params.id).subscribe(res => {
          this.task = res.detail;
          this.taskForm.controls.title.setValue(this.task.title);
          this.taskForm.controls.name.setValue(this.task.name);
          this.taskForm.controls.distribution.setValue(
            this.task.distribution._id
          );
          this.taskForm.controls.genamount.setValue(this.task.genamount);
          this.taskForm.controls.disable.setValue(this.task.disable);
          this.distribution = this.task.distribution.name;
          this.getParamFromDist();
        });
      } else {
        this.getParamFromDist();
      }
    });
  }

  getParamFromDist() {
    this.apiService.getDistributionAll().subscribe(res => {
      this.distributions = res.detail;
      this.apiService.getDistribution(this.distribution).subscribe(res => {
        this.parameters = res.detail.parameters;
        this.taskForm.controls.distribution.setValue(res.detail._id);
        this.createParam();
      });
    });
  }

  createParam() {
    for (let i = 0; i < this.parameters.length; i++) {
      this.taskForm.controls.parameters.push(
        this.formBuilder.group({
          name: [this.parameters[i].name, Validators.required],
          value: [
            this.task ? this.task.parameters[i].value : Number,
            Validators.required
          ]
        })
      );
    }
  }

  changeDist(e) {
    this.apiService.getDistribution(e.target.value).subscribe(res => {
      this.parameters = res.detail.parameters;
      this.createParam();
      this.taskForm.controls.distribution.setValue(res.detail._id);
    });
  }

  saveClick() {
    if (this.taskForm.invalid) {
      console.log(this.taskForm.value);
      alert("กรอกให้ครบสิ");
      return;
    }
    if (this.task) {
      this.apiService.editTask(this.task._id, this.taskForm.value).subscribe(res => {
          alert("task edited!");
          this.router.navigate(['/admin/ex/list'], { queryParams: { type: 'task' } })
          console.log("task edited!");
        });
    } else {
      this.apiService.createTask(this.taskForm.value).subscribe(
        res => {
          alert("task added!");
          console.log("task added!");
          this.router.navigate(['/admin/ex/list'], { queryParams: { type: 'task' } })
        },
        error => {
          alert("ERROR!");
          console.log(error);
        }
      );
    }
  }

  deleteClick() {}
}
