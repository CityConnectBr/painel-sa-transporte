import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { BasicCrudService, SearchData } from './basic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class ObservacaoDoPermissionarioService extends BasicCrudService {

  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, "/api/admin/observacoesdopermissionario");
   }

   indexByPermissionario(permissionarioId: String): Observable<SearchData> {
    return this.httpClient.get<SearchData>(`${this.url}?search=${permissionarioId}`, super.getHttpOptions)
  }
}
