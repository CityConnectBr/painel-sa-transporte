export interface Empresa {
  id: string
  id_integracao: number
  ativo: boolean
  nome: string
  telefone: string
  fax: string
  home_page: string
  email: string
  cnpj: string
  inscricao_estadual: string
  inscricao_municipal: string
  nome_do_diretor: string
  nome_do_gerente: string
  nome_do_encarregado_vistoriador: string
  portaria_diretor: string
  data_nomeacao_diretor: Date
  decreto_municipal_taxi: string
  decreto_municipal_escolar: Date
  endereco_id: string
  tipo_chave_pix: string
  chave_pix: string
}
