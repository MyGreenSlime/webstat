import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get("/api/users/user");
  }

  createExercise(params): Observable<any> {
    return this.http.post("/api/exercises/create", params);
  }

  editExercise(id, params): Observable<any> {
    return this.http.put("/api/exercises/edit/" + id, params);
  }

  editTask(id, params): Observable<any> {
    return this.http.put("/api/tasks/edit/" + id, params);
  }

  createTask(params): Observable<any> {
    return this.http.post("/api/tasks/create", params);
  }

  addTaskToExercis(id, params): Observable<any> {
    return this.http.put("/api/exercises/addtask/" + id, params);
  }

  removeTaskFromExercise(id, params): Observable<any> {
    return this.http.put("/api/exercises/removetask/" + id, params);
  }

  removeTask(id): Observable<any> {
    return this.http.delete("/api/tasks/delete/" + id);
  }

  getExercisesAll(): Observable<any> {
    return this.http.get("/api/exercises");
  }

  getExercisesById(id): Observable<any> {
    return this.http.get("/api/exercises/" + id);
  }

  getTasksAll(): Observable<any> {
    return this.http.get("/api/tasks");
  }

  getTaskById(id): Observable<any> {
    return this.http.get("/api/tasks/" + id);
  }

  getDistributionAll(): Observable<any> {
    return this.http.get("/api/distributions");
  }

  getDistribution(name): Observable<any> {
    return this.http.get("/api/distributions/" + name);
  }

  saveData(params): Observable<any> {
    return this.http.post("/api/results/create", params)
  }
}
