import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(param): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(param.username + ':' + param.password)
      })
    };
    console.log(httpOptions);
    return this.http.post("/api/users/login", null, httpOptions);
  }

  register(param): Observable<any> {
    return this.http.post("/api/users/register", param);
  }
}
