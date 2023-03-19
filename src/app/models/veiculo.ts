import { CorDoVeiculo } from "./cor-do-veiculo";
import { MarcaModeloDeCarroceria } from "./marca-modelo-de-carroceria";
import { MarcaModeloDeChassi } from "./marca-modelo-de-chassi";
import { MarcaModeloDeVeiculo } from "./marca-modelo-de-veiculo";
import { TipoDeCombustivel } from "./tipo-de-combustivel";
import { TipoDeVeiculo } from "./tipo-de-veiculo";

export interface Veiculo {
  id: String
  id_integracao: String
  placa: String
  cod_renavam: String
  chassi: String
  ano_fabricacao: String
  ano_modelo: String
  capacidade: String
  tipo_capacidade: String
  observacao_capacidade: String
  anos_vida_util_veiculo: String
  marca_modelo_veiculo_id: String
  marca_modelo_chassi_id: String
  marca_modelo_carroceria_id: String
  tipo_combustivel_id: String
  cor_id: String
  tipo_veiculo_id: String
  permissionario_id: String
  categoria_id: String
  termino_atividades: String
  inicio_atividades: String
  marca_modelo_veiculo?: MarcaModeloDeVeiculo
  marca_modelo_chassi?: MarcaModeloDeChassi
  marca_modelo_carroceria?: MarcaModeloDeCarroceria
  tipo_combustivel?: TipoDeCombustivel
  tipo_veiculo?: TipoDeVeiculo
  cor?: CorDoVeiculo
  ativo: boolean

}
