export interface Infracao {
  id: string
  num_aip: string
  data_infracao: Date
  hora_infracao: string
  obs_aip: string
  descricao: string
  acao_tomada: string
  num_processo: string
  qtd_moeda: string
  moeda_id: string
  permissionario_id: string
  quadro_infracao_id: string
  natureza_infracao_id: string
  veiculo_id: string
  tipo_pagamento: string//boleto|pix
  chave_pix: string
  codigo_pix: string
  data_pagamento: Date
  status: string//pendente|pago|cancelado|aguardando_confirmacao
  foto_uid: string
  arquivo_comprovante_uid: string
  data_envio_comprovante: Date
  valor_fmp_atual: number
  fmp_id: string
  qtd_fmp: number
  valor: number//valor automatico: qtd_moeda * valor_fmp_atual
  valor_final: number
}
