import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicCrudService } from './basic-crud.service';
import { first, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArquivoService extends BasicCrudService {

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, "/api/admin/arquivos");
  }

  getFile(id: number | String): Observable<any> {
    return this.httpClient.get(`${this.url}/${id}`, {
      headers: super.getHeaderWithAuthorization,
      responseType: 'blob'
    });
  }

  createFile(obj: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('foto', obj, obj.name);

    return this.httpClient.post(`${this.url}`,
      formData, super.getHttpOptionsWithOutContentType)
      .pipe(
        retry(2),
      )
  }

}
