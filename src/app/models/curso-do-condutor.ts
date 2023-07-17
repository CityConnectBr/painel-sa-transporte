import { TipoDeCurso } from "./tipo-de-curso"

export interface CursoDoCondutor {
  id: string
  condutor_id: string
  tipo_do_curso_id: string
  tipo_de_curso: TipoDeCurso
  data_emissao: Date
  data_validade: Date
  nome: string
  descricao: string
}
