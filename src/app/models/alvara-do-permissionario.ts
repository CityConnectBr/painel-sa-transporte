
export interface AlvaraDoPermissionario {
  id: string
  permissionario_id: string
  data_emissao: string
  data_vencimento: string
  data_retorno: string
  observacao_retorno: string
  arquivo_comprovante_uid: string
  tipo_pagamento: string//boleto|pix
  chave_pix: string
  codigo_pix: string
  data_envio_comprovante: Date
  valor: number
  empresa_id: number
  data_pagamento: Date
  status: string//pendente|pago|cancelado|aguardando_confirmacao
}
