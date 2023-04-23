import { Ponto } from "./ponto";

export interface QuadroDeInfracoes {
  id: string
  id_integracao: string
  descricao: string
  acao: string
  reincidencia: string
  modalidade_transporte: string
  qtd_reincidencia: number
  unidade_reincidencia: string
  natureza_infracao_id: string
}
