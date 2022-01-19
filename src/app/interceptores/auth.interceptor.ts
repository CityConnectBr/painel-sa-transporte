import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor,
} from "@angular/common/http";
import { first, catchError, retry, switchMap } from "rxjs/operators";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    if (
      !request.url.startsWith("/auth/login") ||
      request.url.startsWith("/auth/logout") ||
      request.url.startsWith("/auth/refresh")
    ) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status == 403 || error.status == 401) {
          return this.authService.refreshToken().pipe(
            switchMap((_) => {
              const changedReq = request.clone({
                headers: this.authService.getHttpHeaders,
              });
              return next.handle(changedReq);
            }),
            catchError((err) => {
              this.authService.logout();
              return throwError(err);
            })
          );
        }

        return throwError(
          `Error Status: ${error.status}\nMessage: ${error.message}`
        );
      })
    );
  }
}
