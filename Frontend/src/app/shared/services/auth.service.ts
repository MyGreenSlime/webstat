import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(param): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(param.username + ":" + param.password)
      })
    };
    console.log(httpOptions);
    return this.http.post("/api/users/login", null, httpOptions);
  }

  register(param): Observable<any> {
    return this.http.post("/api/users/register", param);
  }

  logout(): Observable<any> {
    return this.http.post("/api/users/logout", null);
  }
}
