export interface Condutor {
  id: string
  id_integracao: number
  ativo: boolean
  foto: boolean
  numero_de_cadastro_antigo: string
  nome: string
  cpf: string
  rg: string
  telefone: string
  celular: string
  email: string
  cnh: string
  categoria_cnh: string
  vencimento_cnh: Date
  atestado_de_saude: boolean
  certidao_negativa: boolean
  validade_certidao_negativa: Date
  registro_ctps: boolean
  primeiros_socorros: boolean
  emissao_primeiros_socorros: Date
  motivo_afastamento: string
  data_inicio_afastamento: Date
  data_termino_afastamento: Date
  endereco_id: string
  permissionario_id: string
  foto_uid: string
}
