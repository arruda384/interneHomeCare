import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Configuracao } from "../util/Configuracao";
import { STORAGE_KEYS } from "../util/localStorage/storage_keys.config";
import { UtilProvider } from "../util/util";
@Injectable()
export class CadService {
  urlApi = environment.apiUrl;
  mvPepApi = environment.mvApiPepHomeCare;
  mvAnexoApi = environment.mvApiPepHomeCare;

  confSinaisVitais: Configuracao = new Configuracao();


constructor(public http: HttpClient, private localStore: Storage, public util: UtilProvider) {
  this.getUrlApi();
}

public getUrlApi() {
  // this.urlApi = "http://192.168.0.101:8080/";
  this.urlApi = window.localStorage.getItem("url_servico");
  console.log("URL CONT NULL: " + this.urlApi);
  if (this.urlApi == null) {

      this.setConfig();
      this.urlApi = window.localStorage.getItem("url_servico");
      console.log("URL CONT NULL: " + this.urlApi);
  }
  return this.urlApi;
}

setConfig() {
  this.getConfiguracoes().subscribe(response => {
      if (response) {
          this.confSinaisVitais = response;
          localStorage.setItem(STORAGE_KEYS.Configuracao.idioma, this.confSinaisVitais.idioma);
          localStorage.setItem(STORAGE_KEYS.Configuracao.versaoIos, this.confSinaisVitais.versaoIos);
          localStorage.setItem(STORAGE_KEYS.Configuracao.versaoAndroid, this.confSinaisVitais.versaoAndroid);
          localStorage.setItem(STORAGE_KEYS.Configuracao.forcarAtualizacao, this.confSinaisVitais.forcarAtualizacao);
          localStorage.setItem(STORAGE_KEYS.Configuracao.url_servico, this.confSinaisVitais.url_servico);
          localStorage.setItem(STORAGE_KEYS.Configuracao.url_validacao, this.confSinaisVitais.url_validacao);
      }
  })
}

getConfig(): Configuracao {
  this.confSinaisVitais.idioma = localStorage.getItem(STORAGE_KEYS.Configuracao.idioma);
  this.confSinaisVitais.versaoIos = localStorage.getItem(STORAGE_KEYS.Configuracao.versaoIos);
  this.confSinaisVitais.versaoAndroid = localStorage.getItem(STORAGE_KEYS.Configuracao.versaoAndroid);
  this.confSinaisVitais.forcarAtualizacao = localStorage.getItem(STORAGE_KEYS.Configuracao.forcarAtualizacao);
  this.confSinaisVitais.url_servico = localStorage.getItem(STORAGE_KEYS.Configuracao.url_servico);
  this.confSinaisVitais.url_validacao = localStorage.getItem(STORAGE_KEYS.Configuracao.url_validacao);
  return this.confSinaisVitais;
}

public getConfiguracoes() {
  let url = this.urlApi +  this.mvPepApi +'/conf';
  
  // let url = 'http://168.138.224.173:8042/mv-api-pep-home-care/conf';

  return this.http
      .get<Configuracao>(url)
      .pipe(
          tap(data => console.log('server data:', data)),
          catchError(this.handleError('Configurações'))
      );
}

public handleError(operation: String) {
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
}