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
  dataFile: any;
  dataArray = [];
  xArray = [];
  yArray = [];

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
      genAmount: [Number, Validators.required],
      parameters: this.formBuilder.array([]),
      disable: [false, Validators.required]
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
          this.taskForm.controls.genAmount.setValue(this.task.genAmount);
          this.taskForm.controls.disable.setValue(this.task.disable);
          this.distribution = this.task.distribution.name;
          this.getParamFromDist();
          if (this.distribution === 'multiple random variable') {
            this.dataFile = {
              name: this.task.parameters[2].value
            }
          }
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
    (<FormArray>this.taskForm.get('parameters')).clear();
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
    this.distribution = e.target.value;
    this.apiService.getDistribution(this.distribution).subscribe(res => {
      this.parameters = res.detail.parameters;
      this.createParam();
      this.taskForm.controls.distribution.setValue(res.detail._id);
    });
  }

  handleFileInput(file) {
    this.dataFile = file[0];
    this.dataArray = [];
    var reader = new FileReader();
    reader.readAsText(this.dataFile);
    let rawData;
    let csvRecordsArray;
    reader.onload = (data) => {
      rawData = reader.result;
      csvRecordsArray = rawData.split(/\r\n|\n/);
      csvRecordsArray.forEach(data => {
        if (data) {
          data = data.split(",");
          data[0] = Number(parseFloat(data[0])).toFixed(5);
          data[1] = Number(parseFloat(data[1])).toFixed(5);
          this.dataArray.push(data[0] + ", " + data[1]);
          this.xArray.push(data[0]);
          this.yArray.push(data[1]);
        }
      });
      this.taskForm.controls.parameters.controls[0].controls.value.setValue(this.xArray);
      this.taskForm.controls.parameters.controls[1].controls.value.setValue(this.yArray);
      this.taskForm.controls.parameters.controls[2].controls.value.setValue(this.dataFile.name);
    }
  }

  saveClick() {
    if (this.taskForm.invalid) {
      console.log(this.taskForm.value)
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

  deleteClick(id) {
    this.apiService.removeTask(id).subscribe(res => {
      console.log("delete complete");
      this.router.navigate(['/admin/ex/list'], { queryParams: { type: 'task' } });
    })
  }
}
