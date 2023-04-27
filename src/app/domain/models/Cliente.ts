export interface Cliente {
  id?: string;
  nome: string;
  cpf: string;
  dataNascimento: Date | null;
  rendaMensal: number;
  email: string;
  dataCadastro: Date;
}
