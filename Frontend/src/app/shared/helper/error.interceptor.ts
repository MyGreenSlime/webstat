import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { GlobalService } from "../services/global.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private globalService: GlobalService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if ([401, 403].indexOf(err.status) !== -1) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          this.cookieService.deleteAll();
          this.router.navigate(["/login"]);
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
