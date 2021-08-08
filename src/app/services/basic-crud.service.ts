import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class BasicCrudService extends MainService {

  constructor(
    protected httpClient: HttpClient,
    urlParth: String
  ) {
    super(httpClient);
    this.url = environment.apiUrl + urlParth
   }

  url: string;
  //url = environment.apiUrl + '/api/admin/v1/perfis'

  index(): Observable<any[]> {
    return this.httpClient.get<any>(this.url, super.getHttpOptions)
      .pipe(
        first(),
        map(result => result['data'])
      )
  }

  search(search: string, page: number = 1): Observable<SearchData> {
    return this.httpClient.get<SearchData>(`${this.url}?search=${search??""}&page=${page??'1'}`, super.getHttpOptions)
  }

  get(id: number): Observable<any> {
    return this.httpClient.get<any>(this.url + `/${id}`, super.getHttpOptions)
      .pipe(
        first(),
      )
  }

  create(obj: any): Observable<any> {
    return this.httpClient.post(this.url,
      JSON.stringify(obj), super.getHttpOptions)
      .pipe(
        first(),
      )
  }

  update(id:number, obj: any): Observable<any> {
    return this.httpClient.put(this.url + `/${id}`,
      JSON.stringify(obj), super.getHttpOptions)
      .pipe(
        retry(2),
      )
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(this.url + `/${id}`,
      super.getHttpOptions)
      .pipe(
        retry(2),
      )
  }

}

export interface SearchData {
  prev_page_url: string
  next_page_url: string
  current_page: number
  ativo: boolean
  data: any[]
}
