import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicCrudService } from './basic-crud.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormularioService extends BasicCrudService {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/api/admin/formularios');
  }

  getFormulario1(permissionarioId: number | String): Observable<Blob> {
    return this.httpClient.get(
      `${this.url}/formulariorenovacaopermissao?id=${permissionarioId}`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }

  getFormulario2(): Observable<Blob> {
    return this.httpClient.get(
      `${this.url}/formulariorequerimentotransferencia`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }

  getFormulario3(): Observable<Blob> {
    return this.httpClient.get(
      `${this.url}/formulariotransfpermissaotranspescolar`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }

  getFormulario4(): Observable<Blob> {
    return this.httpClient.get(
      `${this.url}/formulariotransfpermissaotransptaxi`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }

  getFormulario5(veiculoId: number | String): Observable<Blob> {
    return this.httpClient.get(
      `${this.url}/formularioreqsubsveiculo?id=${veiculoId}`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }

  getFormulario6(veiculoId: number | String): Observable<Blob> {
    return this.httpClient.get(
      `${this.url}/formularioreqprorrsubsveiculo?id=${veiculoId}`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }

  getFormulario7(
    permissionarioId: number | String,
    monitorId: number | String,
    solicitacaoId: number | String
  ): Observable<Blob> {
    return this.httpClient.get(
      `${this.url}/formulariodeclaracaomonitor?id=${permissionarioId}&monitor_id=${monitorId}&solicitacao_id=${solicitacaoId}`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }

  getFormulario7Manual(permissionarioId, data: any): Observable<Blob> {
    let query = `permissionario=${permissionarioId}`;
    if (data) {
      const {
        nomeMonitorInclusao,
        rgMonitorInclusao,
        cpfMonitorInclusao,
        enderecoMonitorInclusao,
        emailMonitorInclusao,
        telefoneMonitorInclusao,
        nomeMonitorExclusao,
        rgMonitorExclusao,
        cpfMonitorExclusao,
      } = data;

      if (nomeMonitorInclusao)
        query += `&nome_monitor_inclusao=${nomeMonitorInclusao}`;
      if (rgMonitorInclusao)
        query += `&rg_monitor_inclusao=${rgMonitorInclusao}`;
      if (cpfMonitorInclusao)
        query += `&cpf_monitor_inclusao=${cpfMonitorInclusao}`;
      if (enderecoMonitorInclusao)
        query += `&endereco_monitor_inclusao=${enderecoMonitorInclusao}`;
      if (emailMonitorInclusao)
        query += `&email_monitor_inclusao=${emailMonitorInclusao}`;
      if (telefoneMonitorInclusao)
        query += `&telefone_monitor_inclusao=${telefoneMonitorInclusao}`;
      if (nomeMonitorExclusao)
        query += `&nome_monitor_exclusao=${nomeMonitorExclusao}`;
      if (rgMonitorExclusao)
        query += `&rg_monitor_exclusao=${rgMonitorExclusao}`;
      if (cpfMonitorExclusao)
        query += `&cpf_monitor_exclusao=${cpfMonitorExclusao}`;
    }

    return this.httpClient.get(
      `${this.url}/formulariodeclaracaomonitor?${query}`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }

  getFormulario8ByCondutor(
    permissionarioId: number | String,
    condutorId: number | String
  ): Observable<Blob> {
    return this.httpClient.get(
      `${this.url}/condutorauxiliar?id=${permissionarioId}&condutor_id=${condutorId}`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }

  getFormulario8BySolicitacao(
    permissionarioId: number | String,
    solicitacaoId: number | String
  ): Observable<Blob> {
    return this.httpClient.get(
      `${this.url}/condutorauxiliar?id=${permissionarioId}&solicitacao_id=${solicitacaoId}`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }

  getFormulario9(): Observable<Blob> {
    return this.httpClient.get(`${this.url}/declaracaoatenddosposto`, {
      headers: super.getHeaderWithAuthorization,
      responseType: 'blob',
    });
  }

  getFormulario16(): Observable<Blob> {
    return this.httpClient.get(`${this.url}/solicitacaoressarcimento`, {
      headers: super.getHeaderWithAuthorization,
      responseType: 'blob',
    });
  }

  getFormulario17(
    permissionarioId: number | String,
    condutorId: number | String
  ): Observable<Blob> {
    return this.httpClient.get(
      `${this.url}/solicitacaodebaixadecondutorauxiliar?id=${permissionarioId}&condutor_id=${condutorId}`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }

  getFormulario18(): Observable<Blob> {
    return this.httpClient.get(`${this.url}/soltranspescestensino`, {
      headers: super.getHeaderWithAuthorization,
      responseType: 'blob',
    });
  }

  getFormulario119(
    vericuloId: number | String,
    dataLimite: string,
    empresa1Id: number | string,
    empresa2Id: number | string = null
  ): Observable<Blob> {
    return this.httpClient.get(
      `${
        this.url
      }/solicitacaoadesivacao?veiculo=${vericuloId}&data_limite=${dataLimite}&empresa1=${empresa1Id}${
        empresa2Id ? '&empresa2=' + empresa2Id : ''
      }`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }

  getFormulario120(veiculoId: number | String): Observable<Blob> {
    return this.httpClient.get(
      `${this.url}/solicitacaoafericaotaximetro?veiculo=${veiculoId}`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }

  getFormulario120Manual(permissionarioId, data: any): Observable<Blob> {
    let query = `permissionario=${permissionarioId}`;
    if (data) {
      const { placa, marca_modelo, cor, ano, taximetro } = data;

      if (placa) query += `&placa=${placa}`;
      if (marca_modelo) query += `&marca_modelo=${marca_modelo}`;
      if (cor) query += `&cor=${cor}`;
      if (ano) query += `&ano=${ano}`;
      if (taximetro) query += `&taximetro=${taximetro}`;
    }

    return this.httpClient.get(
      `${this.url}/solicitacaoafericaotaximetro?${query}`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }

  getFormulario121(
    veiculoId: number | String,
    motivo: string,
    dataLimite: string,
    quandoDevera: string
  ): Observable<Blob> {
    return this.httpClient.get(
      `${this.url}/solicitacaodeautorizacaoprovisoria?veiculo=${veiculoId}&motivo=${motivo}&dataLimite=${dataLimite}&quandoDevera=${quandoDevera}`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }

  getFormulario122(
    veiculoId: number | String,
    motivo: string,
    dataLimite: string,
    quandoDevera: string
  ): Observable<Blob> {
    return this.httpClient.get(
      `${this.url}/solicitacaodeautorizacaoprovisoriaescolar?veiculo=${veiculoId}&motivo=${motivo}&dataLimite=${dataLimite}&quandoDevera=${quandoDevera}`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }

  getFormulario126(permissionarioId: number | String): Observable<Blob> {
    return this.httpClient.get(
      `${this.url}/declaracaoptaxista?permissionario=${permissionarioId}`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }

  getFormulario127(permissionarioId: number | String): Observable<Blob> {
    return this.httpClient.get(
      `${this.url}/declaracaoptransporteescular?permissionario=${permissionarioId}`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }

  getFormulario128(permissionarioId: number | String): Observable<Blob> {
    return this.httpClient.get(
      `${this.url}/formularioderequerimento?permissionario=${permissionarioId}`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }

  getFormulario129(veiculoId: number | String): Observable<Blob> {
    return this.httpClient.get(
      `${this.url}/laudovistoriatransportesespeciais?veiculo=${veiculoId}`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }

  getFormulario130(
    permissionarioId: number | String,
    prazo: string,
    notificado: string
  ): Observable<Blob> {
    return this.httpClient.get(
      `${this.url}/notificacao?permissionario=${permissionarioId}&prazo=${prazo}&notificado=${notificado}`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }

  getFormulario131(
    veiculo1Id: number | String,
    veiculo2Id: number | String
  ): Observable<Blob> {
    return this.httpClient.get(
      `${this.url}/substituicaodeveiculo?veiculo1=${veiculo1Id}&veiculo2=${veiculo2Id}`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }

  getFormulario132(veiculoId: number | String): Observable<Blob> {
    return this.httpClient.get(
      `${this.url}/termocredenciamentotaxi?veiculo=${veiculoId}`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }

  getFormulario133(): Observable<Blob> {
    return this.httpClient.get(`${this.url}/termocredenciamentotranspescolar`, {
      headers: super.getHeaderWithAuthorization,
      responseType: 'blob',
    });
  }

  getFormulario134(infracao: number | String): Observable<Blob> {
    return this.httpClient.get(`${this.url}/aip?infracao=${infracao}`, {
      headers: super.getHeaderWithAuthorization,
      responseType: 'blob',
    });
  }

  getFormulario135(veiculoId: number | String): Observable<Blob> {
    return this.httpClient.get(
      `${this.url}/alvaradopermissionario?veiculo=${veiculoId}`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }

  getFormulario136(veiculoId: number | String): Observable<Blob> {
    return this.httpClient.get(
      `${this.url}/fichapermissionario?veiculo=${veiculoId}`,
      { headers: super.getHeaderWithAuthorization, responseType: 'blob' }
    );
  }
}
