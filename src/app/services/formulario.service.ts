import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicCrudService } from './basic-crud.service';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormularioService extends BasicCrudService {

  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, "/api/admin/formularios");
  }

  getFormulario1(permissionarioId: number | String): Observable<Blob> {
    return this.httpClient.get(`${this.url}/formulariorenovacaopermissao?id=${permissionarioId}`, { headers: super.getHeaderWithAuthorization, responseType: 'blob' },);
  }

  getFormulario7(permissionarioId: number | String, monitorId: number | String, solicitacaoId: number | String): Observable<Blob> {
    return this.httpClient.get(`${this.url}/formulariodeclaracaomonitor?id=${permissionarioId}&monitor_id=${monitorId}&solicitacao_id=${solicitacaoId}`, { headers: super.getHeaderWithAuthorization, responseType: 'blob' },);
  }

  getFormulario8ByCondutor(permissionarioId: number | String, condutorId: number | String): Observable<Blob> {
    return this.httpClient.get(`${this.url}/condutorauxiliar?id=${permissionarioId}&condutor_id=${condutorId}`, { headers: super.getHeaderWithAuthorization, responseType: 'blob' },);
  }

  getFormulario8BySolicitacao(permissionarioId: number | String, solicitacaoId: number | String): Observable<Blob> {
    return this.httpClient.get(`${this.url}/condutorauxiliar?id=${permissionarioId}&solicitacao_id=${solicitacaoId}`, { headers: super.getHeaderWithAuthorization, responseType: 'blob' },);
  }

  getFormulario17(permissionarioId: number | String, condutorId: number | String): Observable<Blob> {
    return this.httpClient.get(`${this.url}/solicitacaodebaixadecondutorauxiliar?id=${permissionarioId}&condutor_id=${condutorId}`, { headers: super.getHeaderWithAuthorization, responseType: 'blob' },);
  }
}