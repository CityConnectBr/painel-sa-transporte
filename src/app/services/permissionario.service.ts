import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicCrudService, SearchData } from './basic-crud.service';
import { Observable } from 'rxjs';
import { first, map, retry } from 'rxjs/operators';
import { Condutor } from '../models/condutores';
import { Veiculo } from '../models/veiculo';
import { Permissionario } from '../models/permissionario';

@Injectable({
  providedIn: 'root',
})
export class PermissionarioService extends BasicCrudService {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/api/admin/permissionarios');
  }

  updateModalidade(id: number | String, obj: any): Observable<any> {
    return this.httpClient
      .put(
        `${this.url}/${id}/modalidade`,
        JSON.stringify(obj),
        super.getHttpOptions
      )
      .pipe(retry(2));
  }

  desativar(id: number | String, obj: any): Observable<any> {
    return this.httpClient
      .put(
        `${this.url}/${id}/desativar`,
        JSON.stringify(obj),
        super.getHttpOptions
      )
      .pipe(retry(2));
  }

  updateDocumentos(id: number | String, obj: any): Observable<any> {
    return this.httpClient
      .put(
        `${this.url}/${id}/documentos`,
        JSON.stringify(obj),
        super.getHttpOptions
      )
      .pipe(retry(2));
  }

  updateFalecimento(id: number | String, obj: any): Observable<any> {
    return this.httpClient
      .put(
        `${this.url}/${id}/falecimento`,
        JSON.stringify(obj),
        super.getHttpOptions
      )
      .pipe(retry(2));
  }

  updatePhoto(id: number | String, fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('foto', fileToUpload, fileToUpload.name);

    return this.httpClient
      .post(
        `${this.url}/${id}/foto`,
        formData,
        super.getHttpOptionsWithOutContentType
      )
      .pipe(retry(2));
  }

  getPhoto(id: number | String): Observable<Blob> {
    return this.httpClient.get(`${this.url}/${id}/foto`, {
      headers: super.getHeaderWithAuthorization,
      responseType: 'blob',
    });
  }

  indexVeiculos(permissionarioId: any): Observable<Veiculo[]> {
    return this.httpClient
      .get<any>(
        `${this.url}/${permissionarioId}/veiculos`,
        super.getHttpOptions
      )
      .pipe(
        first(),
        map((result) => result['data'])
      );
  }

  indexCondutores(permissionarioId: any): Observable<Condutor[]> {
    return this.httpClient
      .get<any>(
        `${this.url}/${permissionarioId}/condutores`,
        super.getHttpOptions
      )
      .pipe(
        first(),
        map((result) => result['data'])
      );
  }

  searchPermissionario(
    search: string,
    page: number = 1,
    ativo: number = 1,
    modalidade: string = '',
    usuario: boolean = false,
    emailOrFCMValid: boolean = false
  ): Observable<SearchData> {
    return this.httpClient
      .get<SearchData>(
        `${this.url}?search=${search ?? ''}&page=${
          page ?? '1'
        }&ativo=${ativo}&modalidade=${modalidade}&usuario=${usuario}&email_push_validos=${emailOrFCMValid}`,
        this.getHttpOptions
      )
      .pipe(first());
  }

  searchAllPermissionario(
    search: string,
    page: number = 1,
    ativo: number = 1,
    modalidade: string = '',
    usuario: boolean = false,
    emailOrFCMValid: boolean = false
  ): Observable<Permissionario[]> {
    return this.httpClient
      .get<Permissionario[]>(
        `${this.url}?search=${search ?? ''}&page=${
          page ?? '1'
        }&ativo=${ativo}&modalidade=${modalidade}&todos=true&usuario=${usuario}&email_push_validos=${emailOrFCMValid}`,
        this.getHttpOptions
      )
      .pipe(first());
  }
}
