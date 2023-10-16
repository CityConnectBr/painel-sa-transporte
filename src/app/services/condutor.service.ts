import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicCrudService, SearchData } from './basic-crud.service';
import { Observable } from 'rxjs';
import { first, retry, map } from 'rxjs/operators';
import { Condutor } from '../models/condutores';

@Injectable({
  providedIn: 'root'
})
export class CondutorService extends BasicCrudService {

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, "/api/admin/condutores");
  }

  updatePhoto(id: number | String, fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('foto', fileToUpload, fileToUpload.name);

    return this.httpClient.post(`${this.url}/${id}/foto`,
      formData, super.getHttpOptionsWithOutContentType)
      .pipe(
        retry(2),
      )
  }

  getPhoto(id: number | String): Observable<Blob> {
    return this.httpClient.get(`${this.url}/${id}/foto`, { headers: super.getHeaderWithAuthorization, responseType: 'blob' },);
  }

  indexByPermissionario(permissionarioId: number | String): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/permissionario/${permissionarioId}`, super.getHttpOptions)
      .pipe(
        map(result => result['data']),
        first(),
      )
  }

  searchAdvanced(
    search: string,
    page: number = 1,
    ativo: number = 1,
    usuario: boolean = false,
    emailOrFCMValid: boolean = false
  ): Observable<SearchData> {
    return this.httpClient
      .get<SearchData>(
        `${this.url}?search=${search ?? ''}&page=${
          page ?? '1'
        }&ativo=${ativo}&usuario=${usuario}&email_push_validos=${emailOrFCMValid}`,
        super.getHttpOptions
      )
      .pipe(first());
  }

  searchAllAdvanced(
    search: string,
    page: number = 1,
    ativo: number = 1,
    usuario: boolean = false,
    emailOrFCMValid: boolean = false
  ): Observable<Condutor[]> {
    return this.httpClient
      .get<Condutor[]>(
        `${this.url}?search=${search ?? ''}&page=${
          page ?? '1'
        }&ativo=${ativo}&todos=true&usuario=${usuario}&email_push_validos=${emailOrFCMValid}`,
        super.getHttpOptions
      )
      .pipe(first());
  }
}

