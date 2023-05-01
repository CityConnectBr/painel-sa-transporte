import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicCrudService, SearchData } from './basic-crud.service';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService extends BasicCrudService {
  readonly TIPO_CHAVE_PIX_CELULAR = 0;
  readonly TIPO_CHAVE_PIX_EMAIL = 1;
  readonly TIPO_CHAVE_PIX_CPF = 2;
  readonly TIPO_CHAVE_PIX_CNPJ = 3;
  readonly TIPO_CHAVE_PIX_ALEATORIO = 4;

  readonly TIPOS_CHAVE_PIX = [
    { id: this.TIPO_CHAVE_PIX_CELULAR, tipo: 'celular' },
    { id: this.TIPO_CHAVE_PIX_EMAIL, tipo: 'email' },
    { id: this.TIPO_CHAVE_PIX_CPF, tipo: 'cpf' },
    { id: this.TIPO_CHAVE_PIX_CNPJ, tipo: 'cnpj' },
    { id: this.TIPO_CHAVE_PIX_ALEATORIO, tipo: 'aleatorio' },
  ];

  constructor(httpClient: HttpClient) {
    super(httpClient, '/api/admin/empresas');
  }
}
