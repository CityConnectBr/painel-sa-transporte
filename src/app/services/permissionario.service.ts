import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicCrudService } from './basic-crud.service';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermissionarioService extends BasicCrudService {

  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, "/api/admin/permissionarios");
   }

   updateModalidade(id: number | String, obj: any): Observable<any> {
     return this.httpClient.put(`${this.url}/${id}/modalidade`,
       JSON.stringify(obj), super.getHttpOptions)
       .pipe(
         retry(2),
       )
   }

   updateDocumentos(id: number | String, obj: any): Observable<any> {
     return this.httpClient.put(`${this.url}/${id}/documentos`,
       JSON.stringify(obj), super.getHttpOptions)
       .pipe(
         retry(2),
       )
   }

   updateFalecimento(id: number | String, obj: any): Observable<any> {
     return this.httpClient.put(`${this.url}/${id}/falecimento`,
       JSON.stringify(obj), super.getHttpOptions)
       .pipe(
         retry(2),
       )
   }
}
