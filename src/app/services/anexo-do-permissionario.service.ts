import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicCrudService, SearchData } from './basic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class AnexoDoPermissionarioService extends BasicCrudService {

  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, "/api/admin/anexosdopermissionario");
   }

   index(): Observable<any[]>{return}
   search(search: string, page: number = 1): Observable<any>{return}
   update(id: number | String, obj: any): Observable<any>{return}

   indexByPermissionario(permissionarioId: String): Observable<SearchData> {
    return this.httpClient.get<SearchData>(`${this.url}?search=${permissionarioId}`, super.getHttpOptions)
  }

}
