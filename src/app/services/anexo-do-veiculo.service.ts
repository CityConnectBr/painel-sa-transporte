import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { BasicCrudService, SearchData } from './basic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class AnexoDoVeiculoService extends BasicCrudService {

  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, "/api/admin/anexosdoveiculo");
  }

  index(): Observable<any[]> { return }
  search(search: string, page: number = 1): Observable<any> { return }
  update(id: number | String, obj: any): Observable<any> { return }
  create(obj: any): Observable<any> { return }

  createWithUpload(obj: any, fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('descricao', obj.descricao);
    formData.append('veiculo_id', obj.veiculo_id);
    return this.httpClient
      .post(this.url, formData, super.getHttpOptionsWithOutContentType).pipe(
        first(),
      );
  }

  get(id: number | String): Observable<any> {
    return this.httpClient.get(`${this.url}/${id}`, {
      headers: super.getHeaderWithAuthorization,
      responseType: 'blob'
    });
  }

  indexByPermissionario(veiculoId: String): Observable<SearchData> {
    return this.httpClient.get<SearchData>(`${this.url}?search=${veiculoId}`, super.getHttpOptions)
  }

}
