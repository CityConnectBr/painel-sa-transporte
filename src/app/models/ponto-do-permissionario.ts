import { Ponto } from "./ponto";

export interface PontoDoPermissionario {
  id: String
  permissionario_id: String
  ponto_id: String
  ponto?: Ponto
}
