import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { retry, first } from 'rxjs/operators';
import { BasicCrudService } from './basic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService extends BasicCrudService {

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, "/api/admin/solicitacoes");
  }

  finish(id: number | String, obj: { 'status': string, 'motivo_recusado'?: string }): Observable<any> {
    return this.httpClient.patch(`${this.url}/${id}/concluir`,
      JSON.stringify(obj), super.getHttpOptions)
      .pipe(
        retry(2),
      )
  }

  indexByPermissionarioAndTipo(permissionarioId: number | String, tipoId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/bypermissionarioandtipo?permissionario_id=${permissionarioId}&tipo_id=${tipoId}`, super.getHttpOptions)
      .pipe(
        first(),
      )
  }

}
