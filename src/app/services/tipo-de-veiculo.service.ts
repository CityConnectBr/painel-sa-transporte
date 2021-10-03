import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicCrudService, SearchData } from './basic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class TipoDeVeiculoService extends BasicCrudService {

  public static readonly modalidades = [
    { id: 'E', desc: 'Escolar Privado' },
    { id: 'G', desc: 'Gratuito (Escolar)' },
    { id: 'T', desc: 'Taxí' }
  ]

  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, "/api/admin/tiposdeveiculo");
  }

}
