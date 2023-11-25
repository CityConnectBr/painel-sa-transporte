import { Condutor } from "./condutores";
import { Endereco } from "./endereco";
import { Fiscal } from "./fiscal";
import { Monitor } from "./monitor";
import { Permissionario } from "./permissionario";
import { TipoDaSolicitacao } from "./tipo-da-solicitacao";
import { Veiculo } from "./veiculo";

export interface SolicitacaoDeAlteracao {
  id: string
  referencia_id: string
  status: string
  motivo_recusado: string
  campo1: string
  campo2: string
  campo3: string
  campo4: string
  campo5: string
  campo6: string
  campo7: string
  campo8: string
  campo9: string
  campo10: string
  campo11: string
  campo12: string
  campo13: string
  campo14: string
  campo15: string
  campo16: string
  campo17: string
  campo18: string
  campo19: string
  campo20: string
  campo21: string
  campo22: string
  campo23: string
  campo24: string
  campo25: string
  valor_anterior_campo1: string
  valor_anterior_campo2: string
  valor_anterior_campo3: string
  valor_anterior_campo4: string
  valor_anterior_campo5: string
  valor_anterior_campo6: string
  valor_anterior_campo7: string
  valor_anterior_campo8: string
  valor_anterior_campo9: string
  valor_anterior_campo10: string
  valor_anterior_campo11: string
  valor_anterior_campo12: string
  valor_anterior_campo13: string
  valor_anterior_campo14: string
  valor_anterior_campo15: string
  valor_anterior_campo16: string
  valor_anterior_campo17: string
  valor_anterior_campo18: string
  valor_anterior_campo19: string
  valor_anterior_campo20: string
  valor_anterior_campo21: string
  valor_anterior_campo22: string
  valor_anterior_campo23: string
  valor_anterior_campo24: string
  valor_anterior_campo25: string
  tipo_solicitacao_id: string
  permissionario_id: string
  condutor_id: string
  fiscal_id: string
  referencia_fiscal_id: string
  referencia_permissionario_id: string
  referencia_monitor_id: string
  referencia_condutor_id: string
  referencia_veiculo_id: string
  endereco_id: string
  arquivo1_uid: string
  arquivo2_uid: string
  arquivo3_uid: string
  arquivo4_uid: string
  arquivo5_uid: string
  arquivo6_uid: string
  arquivo7_uid: string
  arquivo8_uid: string
  arquivo9_uid: string
  arquivo10_uid: string
  tipo: TipoDaSolicitacao
  permissionario: Permissionario
  condutor: Condutor
  fiscal: Fiscal
  endereco: Endereco
  permissionario_referencia: Permissionario
  fiscal_referencia: Fiscal
  condutor_referencia: Condutor
  monitor_referencia: Monitor
  veiculo_referencia: Veiculo
  created_at: Date
}
