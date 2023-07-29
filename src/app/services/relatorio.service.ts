import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicCrudService } from './basic-crud.service';

@Injectable({
  providedIn: 'root',
})
export class RelatorioService extends BasicCrudService {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/api/admin/relatorios');
  }

  getAlvarasExpirados() {
    return this.httpClient.get<any[]>(
      `${this.url}/alvaraexpirado`,
      super.getHttpOptions
    );
  }

  getCurosDePermissionarioExpirados() {
    return this.httpClient.get<any[]>(
      `${this.url}/cursospermissionariovencidos`,
      super.getHttpOptions
    );
  }

  getCurosDeCondutorExpirados() {
    return this.httpClient.get<any[]>(
      `${this.url}/cursoscondutorvencidos`,
      super.getHttpOptions
    );
  }

  getCurosDeMonitorExpirados() {
    return this.httpClient.get<any[]>(
      `${this.url}/cursosmonitorvencidos`,
      super.getHttpOptions
    );
  }
}
