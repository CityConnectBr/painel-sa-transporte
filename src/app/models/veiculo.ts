import { CorDoVeiculo } from "./cor-do-veiculo";
import { MarcaModeloDeCarroceria } from "./marca-modelo-de-carroceria";
import { MarcaModeloDeChassi } from "./marca-modelo-de-chassi";
import { MarcaModeloDeVeiculo } from "./marca-modelo-de-veiculo";
import { TipoDeCombustivel } from "./tipo-de-combustivel";
import { TipoDeVeiculo } from "./tipo-de-veiculo";

export interface Veiculo {
  id: string
  id_integracao: string
  placa: string
  cod_renavam: string
  chassi: string
  ano_fabricacao: string
  ano_modelo: string
  capacidade: string
  tipo_capacidade: string
  observacao_capacidade: string
  anos_vida_util_veiculo: string
  marca_modelo_veiculo_id: string
  marca_modelo_chassi_id: string
  marca_modelo_carroceria_id: string
  tipo_combustivel_id: string
  cor_id: string
  tipo_veiculo_id: string
  permissionario_id: string
  categoria_id: string
  termino_atividades: string
  inicio_atividades: string
  marca_modelo_veiculo?: MarcaModeloDeVeiculo
  marca_modelo_chassi?: MarcaModeloDeChassi
  marca_modelo_carroceria?: MarcaModeloDeCarroceria
  tipo_combustivel?: TipoDeCombustivel
  tipo_veiculo?: TipoDeVeiculo
  cor?: CorDoVeiculo
  ativo: boolean

}
