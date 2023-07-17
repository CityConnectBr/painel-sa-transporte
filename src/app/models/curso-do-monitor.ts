import { TipoDeCurso } from "./tipo-de-curso"

export interface CursoDoMonitor {
  id: string
  monitor_id: string
  tipo_do_curso_id: string
  tipo_de_curso: TipoDeCurso
  data_emissao: Date
  nome: string
  descricao: string
  data_validade: Date
}
