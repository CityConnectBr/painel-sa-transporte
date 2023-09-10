export interface Perfil {
  id: string;
  nome: string;
  cadastro_usuario: boolean;
  cadastro_perfil: boolean;
  cadastro_principais: boolean;
  cadastro_tabelas_base: boolean;
  lancamentos: boolean;
  impressos: boolean;
  relatorios: boolean;
}
