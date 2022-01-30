export interface Monitor {
  id: String
  id_integracao: number
  ativo: boolean
  foto: boolean
  numero_de_cadastro_antigo: String
  nome: String
  cpf: String
  rg: String
  telefone: String
  celular: String
  email: String
  data_nascimento: Date
  certidao_negativa: boolean
  validade_da_certidao_negativa: Date
  curso_de_primeiro_socorros: boolean
  emissao_curso_de_primeiro_socorros: Date
  endereco_id: String
  permissionario_id: String
  foto_uid: String
}
