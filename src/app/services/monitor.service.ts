import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicCrudService, SearchData } from './basic-crud.service';
import { Observable } from 'rxjs';
import { first, retry } from 'rxjs/operators';
import { Monitor } from '../models/monitor';

@Injectable({
  providedIn: 'root',
})
export class MonitorService extends BasicCrudService {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/api/admin/monitores');
  }

  searchByPermissionario(
    permissionarioId: number,
    search: string,
    page: number = 1
  ): Observable<SearchData> {
    return this.httpClient.get<SearchData>(
      `${this.url}bypermissionario?permissionario_id=${
        permissionarioId ?? ''
      }&search=${search ?? ''}&page=${page ?? '1'}`,
      super.getHttpOptions
    );
  }

  updatePhoto(id: number | String, fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('foto', fileToUpload, fileToUpload.name);

    return this.httpClient
      .post(
        `${this.url}/${id}/foto`,
        formData,
        super.getHttpOptionsWithOutContentType
      )
      .pipe(retry(2));
  }

  getPhoto(id: number | String): Observable<Blob> {
    return this.httpClient.get(`${this.url}/${id}/foto`, {
      headers: super.getHeaderWithAuthorization,
      responseType: 'blob',
    });
  }

  searchAdvanced(
    search: string,
    page: number = 1,
    ativo: number = 1,
    emailValid: boolean = false
  ): Observable<SearchData> {
    return this.httpClient
      .get<SearchData>(
        `${this.url}?search=${search ?? ''}&page=${
          page ?? '1'
        }&ativo=${ativo}&email_validos=${emailValid}`,
        super.getHttpOptions
      )
      .pipe(first());
  }

  searchAllAdvanced(
    search: string,
    page: number = 1,
    ativo: number = 1,
    emailValid: boolean = false
  ): Observable<Monitor[]> {
    return this.httpClient
      .get<Monitor[]>(
        `${this.url}?search=${search ?? ''}&page=${
          page ?? '1'
        }&ativo=${ativo}&todos=true&email_validos=${emailValid}`,
        super.getHttpOptions
      )
      .pipe(first());
  }
}
