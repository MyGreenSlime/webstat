import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { ApiService } from "../../../../shared/services/api.service";

@Component({
  selector: "app-exercise",
  templateUrl: "./exercise.component.html",
  styleUrls: ["./exercise.component.scss"]
})
export class ExerciseComponent implements OnInit {
  exerciseForm: any;
  section = "CPE";

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.exerciseForm = this.formBuilder.group({
      nameshow: ["", Validators.required],
      name: ["", Validators.required],
      section: ["CPE", Validators.required],
      disable: [false, Validators.required]
    });
  }

  ngOnInit() {}

  saveClick() {
    if (this.exerciseForm.invalid) {
      alert("กรอกให้ครบสิ");
      return;
    }
    this.apiService.addExercise(this.exerciseForm.value).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteClick() {

  }
}
