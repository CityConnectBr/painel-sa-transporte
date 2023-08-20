import { Ponto } from "./ponto";

export interface QuadroDeInfracoes {
  id: string
  codigo: string
  descricao: string
  acao: string
  reincidencia: string
  modalidade: string
  qtd_reincidencia: number
  unidade_reincidencia: string
  natureza_infracao_id: string
}
