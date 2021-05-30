import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Paciente } from "../page/paciente/Paciente";
import { Prestador } from "../page/prestador/Prestador";
import { Usuario } from "../page/usuario/Usuario";
import { Configuracao } from "./Configuracao";
import { RetornoDocumento } from "./retornoDocumento/RetornoDocumento";


@Injectable()
export class UtilProvider {
  configuracao: Configuracao = null;
  public prestador: Prestador = null;
  public TipoPrestador: Prestador = null;
  public usuario: Usuario = null;
  public paciente: Paciente = null;
  public atendimento: number;
  public retornoDocumento: RetornoDocumento = new RetornoDocumento;

  constructor() {
  }

  public getHeader() : HttpHeaders{
    let head : HttpHeaders = new HttpHeaders();
    return head;
  }

}
