import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicCrudService, SearchData } from './basic-crud.service';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuadroDeInfracoesService extends BasicCrudService {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/api/admin/quadrodeinfracoes');
  }

  searchByModalidade(
    search: string,
    modalidade: string,
    page: number = 1
  ): Observable<SearchData> {
    return this.httpClient
      .get<SearchData>(
        `${this.url}?search=${search ?? ''}&page=${page ?? '1'}&modalidade=${
          modalidade ?? ''
        }`,
        super.getHttpOptions
      )
      .pipe(first());
  }
}
