export interface Permissionario {
  id: string
  id_integracao: number
  ativo: boolean
  foto: boolean
  numero_de_cadastro_antigo: string
  nome_razao_social: string
  tipo: string
  cpf_cnpj: string
  rg: string
  estado_civil: string
  inscricao_municipal: string
  alvara_de_funcionamento: string
  responsavel: string
  procurador_responsavel: string
  telefone: string
  telefone2: string
  celular: string
  email: string
  data_nascimento: Date
  naturalidade: string
  nacionalidade: string
  cnh: string
  categoria_cnh: string
  vencimento_cnh: Date
  atestado_de_saude: boolean
  certidao_negativa: boolean
  validade_certidao_negativa: Date
  comprovante_de_endereco: boolean
  inscricao_do_cadastro_mobiliario: boolean
  numero_do_cadastro_mobiliario: string
  curso_primeiro_socorros: boolean
  curso_primeiro_socorros_emissao: Date
  crlv: boolean
  dpvat: boolean
  certificado_pontuacao_cnh: boolean
  contrato_comodato: boolean
  contrato_comodato_validade: boolean
  ipva: boolean
  relacao_dos_alunos_transportados: boolean
  laudo_vistoria_com_aprovacao_da_sa_trans: boolean
  ciretran_vistoria: boolean
  ciretran_autorizacao: boolean
  selo_gnv: boolean
  selo_gnv_validade: Date
  taximetro_tacografo: boolean
  taximetro_tacografo_numero: string
  taximetro_tacografo_afericao: Date
  inicio_atividades: Date
  termino_atividades: Date
  termino_atividades_motivo: string
  data_transferencia: Date
  classificacao_do_processo: string
  numero_do_processo: string
  data_processo_seletivo: Date
  prefixo: string
  inss: string
  entidade_associativa_id: string
  modalidade_id: string
  endereco_id: string
  data_obito: Date
  certidao_de_obito: string
  observacao_obito: string
  nome_inventariante: string
  grau_de_paretesco_inventariante: string
  numero_do_processo_do_inventario: string
  parecer_do_juiz_sobre_inventario: string
  foto_uid: string
}
