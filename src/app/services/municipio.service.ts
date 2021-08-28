import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicCrudService, SearchData } from './basic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService extends BasicCrudService {

  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, "/api/admin/municipios");
   }

   searchByUF(uf: string, search: string): Observable<SearchData> {
    return this.httpClient.get<SearchData>(`${this.url}/uf?uf=${uf ?? ""}&search=${search ?? ""}`, super.getHttpOptions)
  }
}
