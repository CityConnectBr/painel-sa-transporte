import { Condutor } from "./condutores";
import { Fiscal } from "./fiscal";
import { Monitor } from "./monitor";
import { Permissionario } from "./permissionario";
import { TipoDaSolicitacao } from "./tipo-da-solicitacao";
import { Veiculo } from "./veiculo";

export interface SolicitacaoDeAlteracao {
  id: String
  referencia_id: String
  status: String
  motivo_recusado: String
  campo1: String
  campo2: String
  campo3: String
  campo4: String
  campo5: String
  campo6: String
  campo7: String
  campo8: String
  campo9: String
  campo10: String
  campo11: String
  campo12: String
  campo13: String
  campo14: String
  campo15: String
  campo16: String
  campo17: String
  campo18: String
  campo19: String
  campo20: String
  campo21: String
  campo22: String
  campo23: String
  campo24: String
  campo25: String
  tipo_solicitacao_id: String
  permissionario_id: String
  condutor_id: String
  fiscal_id: String
  referencia_fiscal_id: String
  referencia_permissionario_id: String
  referencia_monitor_id: String
  referencia_condutor_id: String
  referencia_veiculo_id: String
  arquivo1_uid: String
  arquivo2_uid: String
  arquivo3_uid: String
  arquivo4_uid: String
  tipo: TipoDaSolicitacao
  permissionario: Permissionario
  condutor: Condutor
  fiscal: Fiscal
  permissionario_referencia: Permissionario
  fiscal_referencia: Fiscal
  condutor_referencia: Condutor
  monitor_referencia: Monitor
  veiculo_referencia: Veiculo
  created_at: Date
}
