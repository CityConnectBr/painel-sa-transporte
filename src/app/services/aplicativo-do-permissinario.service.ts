import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { BasicCrudService, SearchData } from './basic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class AplicativoDoPermissionarioService extends BasicCrudService {

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, "/api/admin/aplicativosdopermissionario");
   }

   indexByPermissionario(permissionarioId: string): Observable<SearchData> {
    return this.httpClient.get<SearchData>(`${this.url}?search=${permissionarioId}`, super.getHttpOptions)
  }
}
