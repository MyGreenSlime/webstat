import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  isLoggedIn() {
    if (this.cookieService.get("cookie-isa")) {
      let now = new Date();
      if (new Date(this.cookieService.get("exp")) < now) {
        this.cookieService.deleteAll();
        return false;
      }
      return true;
    }
  }

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
    this.cookieService.deleteAll();
    return this.http.post("/api/users/logout", null)
  }
}
