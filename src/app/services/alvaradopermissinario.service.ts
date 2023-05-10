import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, retry } from 'rxjs/operators';
import { BasicCrudService, SearchData } from './basic-crud.service';

@Injectable({
  providedIn: 'root',
})
export class AlvaraDoPermissionarioService extends BasicCrudService {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/api/admin/alvaradopermissionario');
  }

  indexByPermissionario(permissionarioId: string): Observable<SearchData> {
    return this.httpClient.get<SearchData>(
      `${this.url}?search=${permissionarioId}`,
      super.getHttpOptions
    );
  }

  informarPagamento(id: number, data: any): Observable<any> {
    return this.httpClient
      .post(`${this.url}/${id}/lancarpagamento`, data, super.getHttpOptions)
      .pipe(retry(2));
  }
}
