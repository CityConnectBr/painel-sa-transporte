import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SharedModule } from '../shared/shared-module';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  protected readonly urlBase: String = environment.apiUrl;

  private static jwt: string | null | undefined;

  private static typeOfUser: string | null | undefined

  constructor(
    protected httpClient: HttpClient,
  ) { }

  get getJWT(): string | null | undefined {

    if (!MainService.jwt) {
      MainService.jwt = localStorage.getItem('tokenJWT')?.toString();
    }

    return MainService.jwt;
  }

  public static set setPerfilOfUser(value: string) {
    this.typeOfUser = SharedModule.encrypt(value, "tr2su9E32Cduk&zPRu1&O^OmpIHeX^Y^");
  }

  public static get getPerfilOfUser(): string | null {
    try {
      if (this.typeOfUser) {
        return SharedModule.decrypt(this.typeOfUser, "tr2su9E32Cduk&zPRu1&O^OmpIHeX^Y^");
      }

    } catch (e) {
      console.error(e);
    }

    return null;
  }

  set setJWT(value: string | null | undefined) {
    //console.log("setJWT", value);
    MainService.jwt = value;
    if (value) {
      localStorage.setItem('tokenJWT', value);
    } else {
      localStorage.removeItem('tokenJWT');
    }
  }
  get getHttpOptions() {
    return {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json', "Authorization": "Bearer " + this.getJWT }
      )
    };
  }
  get getHeaderWithAuthorization(): HttpHeaders {
    return new HttpHeaders(
      { "Authorization": "Bearer " + this.getJWT }
    );
  }
  //para upload de arquivos
  get getHttpOptionsWithOutContentType() {
    return {
      headers: new HttpHeaders(
        { "Authorization": "Bearer " + this.getJWT }
      )
    };
  }
}
