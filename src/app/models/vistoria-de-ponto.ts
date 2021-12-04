import { Ponto } from "./ponto";
import { Vistoriador } from "./vistoriador";

export interface VistoriaDePonto {
  id: String
  data_vistoria: Date
  condicoes_de_pintura: number
  condicoes_de_cobertura: number
  condicoes_de_emplacamento: number
  condicoes_de_sanitario: number
  observacoes: String
  vistoriador_id: String
  ponto_id: String
  vistoriador: Vistoriador
  ponto: Ponto
}
