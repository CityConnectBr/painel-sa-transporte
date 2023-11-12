import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ViaCEPServiceService {
  url = 'https://viacep.com.br/ws/';

  constructor() {}

  public async getCEP(cep: string) {
    const response = await fetch(`${this.url}${cep}/json/`);
    const data = await response.json();
    return data;
  }
}
