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
    protected httpClient: HttpClient,
  ) {
    super(httpClient, "/api/admin/aplicativosdopermissionario");
   }

   index(): Observable<any[]>{return}
   search(search: string, page: number = 1): Observable<any>{return}
   update(id: number | String, obj: any): Observable<any>{return}

   indexByPermissionario(permissionarioId: String): Observable<SearchData> {
    return this.httpClient.get<SearchData>(`${this.url}?search=${permissionarioId}`, super.getHttpOptions)
  }
}
