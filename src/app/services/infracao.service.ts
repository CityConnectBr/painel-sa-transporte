import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicCrudService } from './basic-crud.service';
import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfracaoService extends BasicCrudService {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/api/admin/infracoes');
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

  informarPagamento(id: number, data: any): Observable<any> {
    return this.httpClient
      .post(`${this.url}/${id}/lancarpagamento`, data, super.getHttpOptions)
      .pipe(retry(2));
  }
}
