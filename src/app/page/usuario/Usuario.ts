export class Usuario {
  codigo: string;
  token: string;
  lembrarUsuario: boolean;

  constructor(codigo: string, token: string, lembrarUsuario: boolean) {
    this.codigo = codigo;
    this.token = token;
    this.lembrarUsuario = lembrarUsuario;
  }

}