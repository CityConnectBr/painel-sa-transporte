import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private regexCheckVoucher = new RegExp('.*(\/)checkvoucher(\/).*');
  private regexRegister = new RegExp('.*(\/)register(\/).*');


  constructor(private authService: AuthService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (this.isExceptUrl(request.url)) {
           return this.authService.handleRequest(request, next);
      }
      return next.handle(request);
  }

  private isExceptUrl(url: string): boolean{
      const isApiUrl: boolean = url.startsWith(environment.apiUrl);
      const isTokenCheckvoucherUrl: boolean = this.regexCheckVoucher.test(url);
      const isTokenRegisterUrl: boolean = this.regexRegister.test(url);
      const isTokenLoginUrl: boolean = url.endsWith('/login');
      const isTokenGenerateRecoverCodeUrl: boolean = url.endsWith('/generaterecovercode');
      const isTokenValidateRecoveryCodeUrl: boolean = url.endsWith('/validaterecoverycode');
      const isTokenRecoverPasswordUrl: boolean = url.endsWith('/recoverypassword');
      const isTokenRefreshUrl: boolean = url.endsWith('/auth/refresh');
      return isApiUrl &&
        !isTokenRegisterUrl &&
        !isTokenLoginUrl &&
        !isTokenGenerateRecoverCodeUrl &&
        !isTokenValidateRecoveryCodeUrl &&
        !isTokenRecoverPasswordUrl &&
        !isTokenRefreshUrl &&
        !isTokenCheckvoucherUrl;
  }
}
