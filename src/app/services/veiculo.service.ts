import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicCrudService, SearchData } from './basic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService extends BasicCrudService {

  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, "/api/admin/veiculos");
   }

  searchPorPermissionario(search: string, permissionarioId: string, page: number = 1): Observable<SearchData> {
    return this.httpClient.get<SearchData>(`${this.url}porpermissionario?search=${search ?? ""}&permissionario_id=${permissionarioId ?? ""}&page=${page ?? '1'}`, super.getHttpOptions)
  }
}
