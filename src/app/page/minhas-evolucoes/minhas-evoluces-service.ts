import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
// import { Storage } from '@ionic/storage';
// import { Configuracao } from '../../model/Configuracao';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { Configuracao } from 'src/app/util/Configuracao';
import { UtilProvider } from 'src/app/util/util';
import { CadService } from 'src/app/cad/cad-service.service';
import { Observable } from 'rxjs';
// import { UtilProvider } from '../../providers/util/util';
// import { STORAGE_KEYS } from '../../providers/cad/storage_keys.config';
// import { s } from '@angular/core/src/render3';
// import { CadService } from '../../cad/cadService';




@Injectable()
export class EvolucaoService{
    urlApi: string;
    confSinaisVitais: Configuracao = new Configuracao();

    

    constructor(public http: HttpClient, private localStore: Storage,
         public util: UtilProvider, public cadService: CadService) {
       
    }



    private handleError(operation: String) {
        return (err: any) => {
            let errMsg = `error in ${operation}()`;
            console.log(`${errMsg}:`, err)
            if (err instanceof HttpErrorResponse) {
                // you could extract more info about the error if you want, e.g.:
                console.log(`status: ${err.status}, ${err.statusText}`);
                // errMsg = ...
            }
            return Observable.throw(errMsg);
        }
    }

    public retornarListaEvolucoes(codigoUsuario: string, dataInicio: string, dataFim: string, codigoPaciente: string) {
        let url = this.cadService.getUrlApi() + '/mv-api-pep-home-care/solicitacao/listarEvolucoes/';
        url = url + '?codigoUsuario=' + codigoUsuario;
        url = url + '&dataInicio=' + dataInicio;
        url = url + '&dataFim=' + dataFim;
        url = url + '&codigoPaciente=' + codigoPaciente;
        let params = new HttpParams();
             
        return this.http
            .get<any>(url, { params: params })
    }

    public cancelarEvolucao(evolucao){   
        let url = this.cadService.getUrlApi() + '/mv-api-pep-home-care/cancelarEvolucao/';
        let head = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(url, evolucao, { responseType: 'json', headers: head })
    } 

    public getPdf(codigoArquivoDocumento: string) {
        let url = this.cadService.getUrlApi() + '/mv-api-pep-home-care/solicitacao/base64pf/';
        url = url + '?codigoArquivoDocumento=' + codigoArquivoDocumento;        
        let params = new HttpParams();             
        return this.http
            .get<any>(url, { params: params })
    }

    public retornarUltimaEvolucao(codigoPaciente: string, codigoObjeto: string) {
        let url = this.cadService.getUrlApi() + '/mv-api-pep-home-care/getUltimoDocumento/';
        url = url + '?codigoPaciente=' + codigoPaciente;
        url = url + '&codigoObjeto=' + codigoObjeto;
        let params = new HttpParams();
             
        return this.http
            .get<any>(url, { params: params })
    }

}