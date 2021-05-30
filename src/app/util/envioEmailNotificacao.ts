
export class EnvioEmailNotificacao {
    listaDestino: Array<string>;
    msg: string;
    codigoUsuario: string;
    assunto: string;

    constructor() {
        this.listaDestino = [];
        this.msg = "";
        this.codigoUsuario = "";
        this.assunto = "";
    }

}