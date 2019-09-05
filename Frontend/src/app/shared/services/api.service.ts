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

  addExercise(params): Observable<any> {
    return this.http.post("/api/exercises/admin/create", params);
  }

  getExercises(): Observable<any> {
    return this.http.get("/api/exercises");
  }

  getTasks(): Observable<any> {
    return this.http.get("/api/tasks");
  }
}
