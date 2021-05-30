import { Imagem } from "src/app/component/imagem/Imagem";

export class SolicitacaoAtendimento {

    id: number;
    cdPrestador: string;
    cdMeio: number;
    cdOrigem: number;
    cdChamado: number;
    cdNivel: number;
    dtSolicidacao: string;
    hrSolicitacao: string;
    nmOrigem: string;
    nrIdent: string;
    meioCompl: string;
    hrRetContato: string;
    observacao: string;
    foneRetContato: string;
    emailRetContato: string;
    cep: string;
    endRetContato: string;
    nroRetContato: string;
    complRetContato: string;
    descrChamado: string;
    encaminhar: string;
    cdReceptor: number;
    cdMultiEmpresa: number;
    tpPrioridade: string;
    dtPrevisaoRetorno: string;
    snRetornaContato: string;
    dtEncerramento: string;
    cdUsuarioEncerramento: string;
    snSatisfatorio: string;
    snFidelidade: string;
    tpSituacao: string;
    snConfidencial: string;
    cdAtendimento: string;
    cdPaciente: number;
    tpTempoRetorno: number;
    cdUsuarioAbertura: string;
    nrTelefone: string;
    cdSetor: number;
    loDescricaoChamado: string;
    listaImagens: Array<Imagem> = new Array<Imagem>();
    nomePaciente: string;
}