import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicCrudService } from './basic-crud.service';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends BasicCrudService {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/api/admin/usuarios');
  }

  /*saveAssinatura(id: number | String, assinatura: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('assinatura', assinatura, "assinatura.jpg");
    formData.append('usuario_id', id.toString());

    return this.httpClient.post(`${this.url}/assinatura`,
      formData, super.getHttpOptionsWithOutContentType)
      .pipe(
        retry(2),
        first()
      )
  }*/

  saveAssinatura(id: number | String, assinatura: any): Observable<any> {
    const formData = new FormData();

    formData.append('assinatura', assinatura);
    formData.append('usuario_id', id.toString());

    return this.httpClient
      .post(
        `${this.url}/assinatura`,
        formData,
        super.getHttpOptionsWithOutContentType
      )
      .pipe(first());
  }

  getAssinatura(id: number | String): Observable<any> {
    return this.httpClient.get(`${this.url}/assinatura/${id}`, {
      headers: super.getHeaderWithAuthorization,
      responseType: 'blob'
    });
  }
}
