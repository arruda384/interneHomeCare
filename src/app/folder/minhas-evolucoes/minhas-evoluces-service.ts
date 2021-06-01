import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Configuracao } from 'src/app/util/Configuracao';
import { UtilProvider } from 'src/app/util/util';
import { environment } from 'src/environments/environment';


@Injectable()
export class EvolucaoService{
  urlApi = environment.apiUrl;
  mvPepApi = environment.mvApiPepHomeCare;
  mvAnexoApi = environment.mvApiPepHomeCare;

    confSinaisVitais: Configuracao = new Configuracao();

    

    constructor(public http: HttpClient, 
                 public util: UtilProvider) {
       
    }



    // private handleError(operation: String) {
    //     return (err: any) => {
    //         let errMsg = `error in ${operation}()`;
    //         console.log(`${errMsg}:`, err)
    //         if (err instanceof HttpErrorResponse) {
    //             // you could extract more info about the error if you want, e.g.:
    //             console.log(`status: ${err.status}, ${err.statusText}`);
    //             // errMsg = ...
    //         }
    //         return Observable.throw(errMsg);
    //     }
    // }

    public retornarListaEvolucoes(codigoUsuario: string, dataInicio: string, dataFim: string, codigoPaciente: string) {
        // let url = 'localhost:8080' + '/mv-api-pep-home-care/solicitacao/listarEvolucoes/';

      

        let url = this.urlApi + this.mvPepApi+ '/solicitacao/listarEvolucoes/';
        url = url + '?codigoUsuario=' + codigoUsuario;
        url = url + '&dataInicio=' + dataInicio;
        url = url + '&dataFim=' + dataFim;
        url = url + '&codigoPaciente=' + codigoPaciente;
             let params = new HttpParams();
             
        return this.http
            .get<any>(url, { params: params})
    }

    public cancelarEvolucao(evolucao){   
        let url = this.urlApi + this.mvPepApi+ '/cancelarEvolucao/';
        let head = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(url, evolucao, { responseType: 'json', headers: head })
    } 

    public getPdf(codigoArquivoDocumento: string) {
        let url = this.urlApi + this.mvPepApi+ '/solicitacao/base64pf/';
        url = url + '?codigoArquivoDocumento=' + codigoArquivoDocumento;        
        let params = new HttpParams();             
        return this.http
            .get<any>(url, { params: params })
    }

    public retornarUltimaEvolucao(codigoPaciente: string, codigoObjeto: string) {
        let url = this.urlApi + this.mvPepApi+ '/getUltimoDocumento/';
        url = url + '?codigoPaciente=' + codigoPaciente;
        url = url + '&codigoObjeto=' + codigoObjeto;
        let params = new HttpParams();
             
        return this.http
            .get<any>(url, { params: params })
    }

}