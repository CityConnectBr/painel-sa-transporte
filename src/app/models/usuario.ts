import { Perfil } from "./perfil"

export interface Usuario {
  id: string
  nome: string
  email: string
  perfil_web_id: number
  password: string | null | undefined
  assinatura: boolean
  ativo: boolean
  perfil: Perfil
}
