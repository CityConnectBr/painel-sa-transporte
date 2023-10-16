export interface Mensagem {
  id?: string;
  assunto: string;
  conteudo: string;
  email: boolean;
  push: boolean;
  destinatarios: Destinatario[];
}

export interface Destinatario {
  id: string;
  tipo: string; // permissionario, condutor, monitor, fiscal
  nome: string;
  email?: string;
  fmc_token?: string;
}
