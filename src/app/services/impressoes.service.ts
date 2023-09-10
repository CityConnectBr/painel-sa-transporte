import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicCrudService } from './basic-crud.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImpressoesService extends BasicCrudService {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/api/admin/impressoes');
  }

  getImpressao1Certificado(id: number | String): Observable<Blob> {
    return this.httpClient.get(`${this.url}/lancamentocertidao?id=${id}`, {
      headers: super.getHeaderWithAuthorization,
      responseType: 'blob',
    });
  }
}
