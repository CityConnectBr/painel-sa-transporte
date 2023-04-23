import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicCrudService } from './basic-crud.service';
import { Observable, first } from 'rxjs';
import { ValoresDeInfracao } from '../models/valores-de-infracao';

@Injectable({
  providedIn: 'root',
})
export class ValoresDeInfracaoService extends BasicCrudService {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/api/admin/valoresdainfracao');
  }

  public getByModalidadeIdAndNaturezaId(
    modalidadeId: string,
    naturezaId: string
  ): Observable<ValoresDeInfracao[]> {
    return this.httpClient
      .get<ValoresDeInfracao[]>(
        `${this.url}/findbynaturezaandmodalidade?modalidade=${modalidadeId}&natureza=${naturezaId}`,
        super.getHttpOptions
      )
      .pipe(first());
  }
}
