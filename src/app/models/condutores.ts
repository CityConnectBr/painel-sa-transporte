export interface Condutor {
  id: String
  id_integracao: number
  foto: boolean
  numero_de_cadastro_antigo: String
  nome: String
  cpf: String
  rg: String
  telefone: String
  celular: String
  email: String
  cnh: String
  categoria_cnh: String
  vencimento_cnh: Date
  atestado_de_saude: boolean
  certidao_negativa: boolean
  validade_certidao_negativa: Date
  registro_ctps: boolean
  primeiros_socorros: boolean
  emissao_primeiros_socorros: Date
  motivo_afastamento: String
  data_inicio_afastamento: Date
  data_termino_afastamento: Date
  endereco_id: String
  permissionario_id: String
}
