import { Parametro } from './Parametro';
import { SolicitacaoAtendimento } from '../SolicitacaoAtendimento';
import { Imagem } from '../../model/Imagem';

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