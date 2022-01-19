import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { retry, catchError, tap, switchMap, filter, first, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Usuario } from '../models/usuario';
import { MainService } from './main.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends MainService {

  url = this.urlBase + '/auth'
  urUser = this.urlBase + '/api/user'

  private static isLoaded = false;

  private tokenRefreshInProgress: boolean = false;
  private refreshAccessTokenSubject: Subject<AccessToken> = new BehaviorSubject<AccessToken>({ jwt: null });

  login(login: string, senha: string): Observable<any> {
    return this.httpClient.post<string>(this.url + "/login",
      {
        "email": login,
        "password": senha
      })
      .pipe(
        tap(val => {
          let valAny: any = val;
          super.setJWT = valAny ? valAny["token"] : null;

          //this.me();
        }),
        retry(1),
        //catchError(this.handleError)
      )
  }

  generateRecoveryCode(email: string): Observable<any> {
    return this.httpClient.post<string>(this.url + "/generaterecovercode",
      {
        "email": email,
      })
  }

  checkRecoveryCode(email: string, code: string): Observable<any> {
    return this.httpClient.post<string>(this.url + "/validaterecoverycode",
      {
        "email": email,
        "code": code,
      })
  }

  recoveryPassword(email: string, code: string, password: string): Observable<any> {
    return this.httpClient.post<string>(this.url + "/auth/recoverypassword",
      {
        "email": email,
        "code": code,
        "new_password": password,
      })
  }

  refreshToken(): Observable<any> {
    return this.httpClient.get(this.url + '/refresh', {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json', "Authorization": "Bearer " + localStorage.getItem('tokenJWT')?.toString() }
      )
    })
      .pipe(
        tap(val => {
          const valAny: any = val;
          super.setJWT = valAny ? valAny["newToken"] : null;
        }),
      )
  }

  me(): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.urUser, super.getHttpOptions)
      .pipe(
        tap(val => {
          if (val) {
            MainService.setPerfilOfUser = val.perfil_web_id.toString()
          };
        })
        //retry(2),
        //catchError(this.handleError)
      )
  }

  update(usuario: Usuario): Observable<any> {
    return this.httpClient.put(this.url+"/updatedados",
      JSON.stringify(usuario), super.getHttpOptions)
      .pipe(
        retry(2),
      )
  }

  async isLogged(): Promise<boolean> {
    try {
      if (!AuthService.isLoaded) {
        await this.refreshToken().toPromise();
        //this.teste();
        AuthService.isLoaded = true;
      }
      let usuario: Usuario = await this.httpClient.get<Usuario>(this.urUser, super.getHttpOptions)
        .pipe(
          tap(val => {
            if (val) {
              MainService.setPerfilOfUser = val.perfil_web_id.toString()
            }
          }),
          retry(2),
          //catchError(this.handleError)
        ).toPromise();

      if (usuario && usuario.id) {
        return true;
      }
    }
    catch (e) {
      /*if (e instanceof HttpErrorResponse && e["status"] >= 500) {
        return true;
      }*/
      return false;
    }

    return false;
  }

  async logout() {
    await this.httpClient.get(this.url + '/logout', super.getHttpOptions).toPromise();

    super.setJWT = undefined;
  }

  public handleRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.tokenNeedsRefresh()) {
      return this.refresh().pipe(
        switchMap((token: AccessToken) => {
          request = this.addTokenToRequest(token, request);
          return next.handle(request);
        })
      )
    }
    if (this.hasToWaitForRefresh()) {
      return this.waitForRefreshToken().pipe(
        switchMap((token: AccessToken) => {
          request = this.addTokenToRequest(token, request);
          return next.handle(request);
        })
      )
    }

    return next.handle(request);
  }

  private tokenNeedsRefresh(): boolean {
    return this.tokenExpired() && !this.tokenRefreshInProgress
  }

  private hasToWaitForRefresh(): boolean {
    return this.tokenExpired() && this.tokenRefreshInProgress
  }

  // Completes after first event
  private refresh(): Observable<AccessToken> {
    this.tokenRefreshInProgress = true;
    return this.refreshToken().pipe(
      map((authRespose): AccessToken => authRespose.access),
      tap((token: AccessToken) => {
        this.setJWT = token.jwt;
        this.tokenRefreshInProgress = false;
        this.refreshAccessTokenSubject.next(token);
      })
    );
  }

  private tokenExpired(): boolean {
    try {
      let token: string = this.getJWT ? this.getJWT : "";

      let expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      //console.log("COMP>>>>", `${(Math.floor((new Date).getTime() / 1000))} >= ${expiry}`);
      return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    } catch (e) {
      return true;
    }
  }

  // Completes after first event
  private waitForRefreshToken(): Observable<AccessToken> {
    return this.refreshAccessTokenSubject.pipe(
      filter(result => result !== null),
      first()
    )
  }

  private addTokenToRequest(token: AccessToken, request: HttpRequest<any>): HttpRequest<any> {
    const httpHeaders = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    request = request.clone({ headers: httpHeaders });
    return request;
  }

}


export interface AccessToken {
  jwt: string | null | undefined
}
