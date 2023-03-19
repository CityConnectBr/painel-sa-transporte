import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicCrudService } from './basic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class ValoresDeInfracaoService extends BasicCrudService {

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, "/api/admin/valoresdainfracao");
   }
}
