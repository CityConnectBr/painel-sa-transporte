import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { BasicCrudService, SearchData } from './basic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class AnexoDoPermissionarioService extends BasicCrudService {

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, "/api/admin/anexosdopermissionario");
  }

  createWithUpload(obj: any, fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('descricao', obj.descricao);
    formData.append('permissionario_id', obj.permissionario_id);
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

  indexByPermissionario(permissionarioId: string): Observable<SearchData> {
    return this.httpClient.get<SearchData>(`${this.url}?search=${permissionarioId}`, super.getHttpOptions)
  }

}
