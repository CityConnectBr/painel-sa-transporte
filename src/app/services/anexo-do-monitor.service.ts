import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { BasicCrudService, SearchData } from './basic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class AnexoDoMonitorService extends BasicCrudService {

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, "/api/admin/anexosdomonitor");
  }

  createWithUpload(obj: any, fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('descricao', obj.descricao);
    formData.append('monitor_id', obj.monitor_id);
    return this.httpClient
      .post(this.url, formData, super.getHttpOptionsWithOutContentType).pipe(
        first(),
      );
  }

  getFile(id: number | String): Observable<any> {
    return this.httpClient.get(`${this.url}/${id}`, {
      headers: super.getHeaderWithAuthorization,
      responseType: 'blob'
    });
  }

  indexByCondutor(condutorId: String): Observable<SearchData> {
    return this.httpClient.get<SearchData>(`${this.url}?search=${condutorId}`, super.getHttpOptions)
  }

}
