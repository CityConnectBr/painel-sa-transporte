import { Ponto } from "./ponto";

export interface ObservacaoDoPermissionario {
  id: string
  permissionario_id: string
  titulo: string
  observacao: string
  created_at: Date
}
