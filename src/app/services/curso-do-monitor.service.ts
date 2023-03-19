import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicCrudService, SearchData } from './basic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class CursoDoMonitorService extends BasicCrudService {

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, "/api/admin/cursosdomonitor");
   }

   indexByCondutor(condutorId: String): Observable<SearchData> {
    return this.httpClient.get<SearchData>(`${this.url}?search=${condutorId}`, super.getHttpOptions)
  }

}
