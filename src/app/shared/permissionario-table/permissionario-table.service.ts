import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Permissionario } from 'src/app/models/permissionario';
import { SearchData } from 'src/app/services/basic-crud.service';
import { MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PermissionarioTableService {
  urlBase = '/api/admin/permissionarios';
  mainService: MainService;
  constructor(injector: Injector, private httpClient: HttpClient) {
    this.mainService = injector.get<MainService>(MainService);
  }

  searchPermissionario(
    search: string,
    page: number = 1,
    ativo: number = 1,
    modalidade: string = '',
    usuario: boolean = false,
  ): Observable<SearchData> {
    return this.httpClient
      .get<SearchData>(
        `${environment.apiUrl}${this.urlBase}?search=${search ?? ''}&page=${
          page ?? '1'
        }&ativo=${ativo}&modalidade=${modalidade}&usuario=${usuario}`,
        this.mainService.getHttpOptions
      )
      .pipe(first());
  }

  searchAllPermissionario(
    search: string,
    page: number = 1,
    ativo: number = 1,
    modalidade: string = '',
    usuario: boolean = false,
  ): Observable<Permissionario[]> {
    return this.httpClient
      .get<Permissionario[]>(
        `${environment.apiUrl}${this.urlBase}?search=${search ?? ''}&page=${
          page ?? '1'
        }&ativo=${ativo}&modalidade=${modalidade}&todos=true&usuario=${usuario}`,
        this.mainService.getHttpOptions
      )
      .pipe(first());
  }

  get(id: string): Observable<any> {
    return this.httpClient
      .get<any>(
        `${environment.apiUrl}${this.urlBase}/${id}`,
        this.mainService.getHttpOptions
      )
      .pipe(first());
  }
}
