import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { BasicCrudService } from './basic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService extends BasicCrudService {

  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, "/api/admin/solicitacoes");
  }

  finish(id: number | String, obj: { 'status': String, 'motivo_recusado'?: String }): Observable<any> {
    return this.httpClient.patch(`${this.url}/${id}/concluir`,
      JSON.stringify(obj), super.getHttpOptions)
      .pipe(
        retry(2),
      )
  }

}
