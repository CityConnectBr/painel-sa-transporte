export interface Infracao {
  id: String
  num_aip: String
  data_infracao: Date
  hora_infracao: Date
  local: String
  obs_aip: String
  descricao: String
  acao_tomada: String
  num_processo: String
  data_vendimento_boleto: Date
  qtd_moeda: String
  valor_moeda: String
  moeda_id: String
  permissionario_id: String
  quadro_infracao_id: String
  natureza_infracao_id: String
}
