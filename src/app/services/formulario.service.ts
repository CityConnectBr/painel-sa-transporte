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
    httpClient: HttpClient,
  ) {
    super(httpClient, "/api/admin/formularios");
  }

  getFormulario1(permissionarioId: number | String): Observable<Blob> {
    return this.httpClient.get(`${this.url}/formulariorenovacaopermissao?id=${permissionarioId}`, { headers: super.getHeaderWithAuthorization, responseType: 'blob' },);
  }

  getFormulario2(): Observable<Blob> {
    return this.httpClient.get(`${this.url}/formulariorequerimentotransferencia`, { headers: super.getHeaderWithAuthorization, responseType: 'blob' },);
  }

  getFormulario3(): Observable<Blob> {
    return this.httpClient.get(`${this.url}/formulariotransfpermissaotranspescolar`, { headers: super.getHeaderWithAuthorization, responseType: 'blob' },);
  }

  getFormulario4(): Observable<Blob> {
    return this.httpClient.get(`${this.url}/formulariotransfpermissaotransptaxi`, { headers: super.getHeaderWithAuthorization, responseType: 'blob' },);
  }

  getFormulario5(veiculoId: number | String): Observable<Blob> {
    return this.httpClient.get(`${this.url}/formularioreqsubsveiculo?id=${veiculoId}`, { headers: super.getHeaderWithAuthorization, responseType: 'blob' },);
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
