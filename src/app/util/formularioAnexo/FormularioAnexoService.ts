import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { UtilProvider } from '../util';
import { CadService } from 'src/app/cad/cad-service.service';
import { FormularioAnexo } from './FormularioAnexo';

@Injectable()
export class FormularioAnexoService {
    urlApi: string;
    public terceirizado  = localStorage.getItem("terceirizado") ==  "true" ? true : false;

    getUrlApi(){
        this.urlApi = window.localStorage.getItem("url_servico");

        if (this.urlApi == null) {
            this.cadService.setConfig();
            this.urlApi = window.localStorage.getItem("url_servico");
            }
      
        return this.urlApi;
    }

    constructor(public http: HttpClient, public util: UtilProvider, public cadService: CadService) {
        
        this.urlApi = window.localStorage.getItem("url_servico");
        this.cadService.getUrlApi();
     
    }


    public salvar(formularioAnexo: FormularioAnexo) {

        let url = this.urlApi + '/mv-api-documento-anexo/salvarDocumentoAnexo/';
        let head = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(url,formularioAnexo, { responseType: 'json', headers: head });
    }

    public upLoad(formularioAnexo: FormularioAnexo) {

        let headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Authorization': 'Basic cHNkZWxpdmVyeTpwc2RlbGl2ZXJ5cG9ydGFs'
          });
        let url = this.urlApi + '/mv-api-documento-anexo/upLoadDocumentoAnexo/';
        let head = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(url,formularioAnexo, { responseType: 'json', headers: head });
    }
}