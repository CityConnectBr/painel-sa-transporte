import { Ponto } from "./ponto";
import { Vistoriador } from "./vistoriador";

export interface VistoriaDePonto {
  id: string
  data_vistoria: Date
  condicoes_de_pintura: number
  condicoes_de_cobertura: number
  condicoes_de_emplacamento: number
  condicoes_de_sanitario: number
  observacoes: string
  vistoriador_id: string
  ponto_id: string
  vistoriador: Vistoriador
  ponto: Ponto
}
