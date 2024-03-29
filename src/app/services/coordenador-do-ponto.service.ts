import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicCrudService, SearchData } from './basic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class CoordenadorDoPontoService extends BasicCrudService {

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, "/api/admin/coordenadoresdoponto");
   }

   indexByPonto(pontoId: string): Observable<SearchData> {
    return this.httpClient.get<SearchData>(`${this.url}?search=${pontoId}`, super.getHttpOptions)
  }

}
