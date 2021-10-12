import { Ponto } from "./ponto";

export interface QuadroDeInfracoes {
  id: String
  id_integracao: String
  descricao: String
  acao: String
  reincidencia: String
  modalidade_transporte: String
  qtd_reincidencia: number
  unidade_reincidencia: String
  natureza_infracao_id: String
}
