import { Ponto } from "./ponto";

export interface PontoDoPermissionario {
  id: string
  permissionario_id: string
  ponto_id: string
  ponto?: Ponto
}
