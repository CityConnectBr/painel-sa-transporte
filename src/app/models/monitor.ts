import { Usuario } from './usuario';

export interface Monitor {
  id: string;
  id_integracao: number;
  ativo: boolean;
  foto: boolean;
  numero_de_cadastro_antigo: string;
  nome: string;
  cpf: string;
  rg: string;
  telefone: string;
  celular: string;
  email: string;
  data_nascimento: Date;
  certidao_negativa: boolean;
  validade_da_certidao_negativa: Date;
  curso_de_primeiro_socorros: boolean;
  emissao_curso_de_primeiro_socorros: Date;
  endereco_id: string;
  permissionario_id: string;
  foto_uid: string;
}
