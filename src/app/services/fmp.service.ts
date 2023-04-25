import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicCrudService, SearchData } from './basic-crud.service';
import { Observable, first, map } from 'rxjs';
import { FMP } from '../models/fmp';

@Injectable({
  providedIn: 'root'
})
export class FMPService extends BasicCrudService {

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, "/api/admin/fmp");
   }

   indexValidos(): Observable<FMP[]> {
    return this.httpClient.get<any>(this.url+"/validos", super.getHttpOptions)
      .pipe(
        first(),
      )
  }

}
