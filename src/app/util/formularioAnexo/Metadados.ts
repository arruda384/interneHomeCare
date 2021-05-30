/*
* Model para trazer os metadados do APP
* Seriço antes utilizado para montar a tela de retorno do APP
* A função foi descontinuada porem, o serviço não foi alterado devido
* a algumas dependencias em outras telas que ainda não foram desativadas
*/



export class Metadados {
    descricaoRetorno: String;
    usuario: String;
    lista:[
        {
            identificador: string;
            valor: string;
        }
    ]
}