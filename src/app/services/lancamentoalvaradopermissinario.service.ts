import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, retry } from 'rxjs/operators';
import { BasicCrudService, SearchData } from './basic-crud.service';

@Injectable({
  providedIn: 'root',
})
export class LancamentoAlvaraDoPermissionarioService extends BasicCrudService {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/api/admin/lancamentoalvaradopermissionario');
  }

  indexPendentes(page: number = 1): Observable<SearchData> {
    return this.httpClient.get<SearchData>(
      `${this.url}?page=${page ?? '1'}`,
      super.getHttpOptions
    );
  }

  informarPagamento(id: string, data: any): Observable<any> {
    return this.httpClient
      .post(`${this.url}/${id}/lancarpagamento`, data, super.getHttpOptions)
      .pipe(retry(2));
  }
}
