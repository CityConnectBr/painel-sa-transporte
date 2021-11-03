import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicCrudService } from './basic-crud.service';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FiscalService extends BasicCrudService {

  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, "/api/admin/fiscais");
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
}
