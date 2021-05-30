import { Imagem } from 'src/app/component/imagem/Imagem';
import { Parametro } from './Parametro';
import { SolicitacaoAtendimento } from './SolicitacaoAtendimento';


export class FormularioAnexo { 
    listaImagens: Imagem[] = new Array<Imagem>();
    codigoPaciente: string;
    codigoAtendimento: string;
    codigoUsuario: string;
    codTipoDocumento: string;
    resposta: string;
    parametros : Parametro[] = new Array<Parametro>();
    solicitacaoAtendimento : SolicitacaoAtendimento;
}