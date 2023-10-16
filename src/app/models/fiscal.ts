import { Usuario } from "./usuario"

export interface Fiscal {
  id: string
  id_integracao: number
  ativo: boolean
  foto: boolean
  nome: string
  cpf: string
  telefone: string
  email: string
  cargo: string
  unidade_trabalho: string
  endereco_id: string
  foto_uid: string
  usuario?: Usuario
}
