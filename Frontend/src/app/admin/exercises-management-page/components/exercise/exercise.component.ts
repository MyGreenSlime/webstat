import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl
} from "@angular/forms";
import { ApiService } from "../../../../shared/services/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: "app-exercise",
  templateUrl: "./exercise.component.html",
  styleUrls: ["./exercise.component.scss"]
})
export class ExerciseComponent implements OnInit {
  exerciseForm: any;
  exercise: any;
  section = "cpe";
  tasks: any;
  selectedTasks: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.exerciseForm = this.formBuilder.group({
      title: ["", Validators.required],
      name: ["", Validators.required],
      description: ["", Validators.required],
      section: ["cpe", Validators.required],
      disable: [false, Validators.required],
      tasks: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.apiService.getExercisesById(params.id).subscribe(res => {
          this.exercise = res.detail;
          setTimeout(() => {
            this.exerciseForm.controls.title.setValue(this.exercise.title);
            this.exerciseForm.controls.name.setValue(this.exercise.name);
            this.exerciseForm.controls.section.setValue(this.exercise.section);
            this.exerciseForm.controls.disable.setValue(this.exercise.disable);
            this.exerciseForm.controls.description.setValue(
              this.exercise.description
            );
            for (let i = 0; i < this.exercise.tasks.length; i++) {
              <FormArray>this.exerciseForm.controls.tasks.push(new FormControl(this.exercise.tasks[i]._id))
            }
            // console.log(this.exerciseForm.value)
          }, 200);
        });
      }
    });
    this.apiService.getTasksAll().subscribe(res => {
      // console.log(res.detail);
      this.tasks = res.detail;
    });
  }

  changeTask(e, task: any) {
    // this.selectedTasks = <FormArray>this.exerciseForm.controls.tasks;
    if (e.target.checked) {
      <FormArray>this.exerciseForm.controls.tasks.push(new FormControl(task._id));
    } else {
      let index = <FormArray>this.exerciseForm.controls.tasks.controls.findIndex(x => x.value == task._id);
      <FormArray>this.exerciseForm.controls.tasks.removeAt(index);
    }
    // console.log(this.exerciseForm.controls.tasks);
  }

  findTask(id) {
    if (this.exercise) {
      let haveTask = this.exercise.tasks.find(task => {
        return task._id === id;
      });
      if (haveTask) return true;
      else return false;
    }
  }

  saveClick() {
    if (this.exerciseForm.invalid) {
      alert("กรอกให้ครบสิ");
      return;
    }
    if (this.exercise) {
      this.apiService.editExercise(this.exercise._id, this.exerciseForm.value).subscribe(
        res => {
          this.router.navigate(['/admin/ex/list'], { queryParams: { type: 'exercise' } })
          console.log("exercise edited!");
        },
        error => {
          alert("ERROR!");
          console.log(error);
        });
    } else {
      this.apiService.createExercise(this.exerciseForm.value).subscribe(
        res => {
          alert("task added!");
          this.router.navigate(['/admin/ex/list'], { queryParams: { type: 'exercise' } })
          console.log("exercise added!");
        },
        error => {
          alert("ERROR!");
          console.log(error);
        }
      );
    }
  }

  deleteClick(id) {
    this.apiService.removeExercise(id).subscribe(res => {
      console.log("delete complete");
      this.router.navigate(['/admin/ex/list']);
    })
  }
}
