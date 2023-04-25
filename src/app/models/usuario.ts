export interface Usuario {
  id: string
  nome: string
  email: string
  perfil_web_id: number
  password: string | null | undefined
  ativo: boolean
}
