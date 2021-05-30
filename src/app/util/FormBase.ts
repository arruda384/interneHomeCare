import { Injectable } from '@angular/core';
import { AlertController, LoadingController, } from '@ionic/angular';
import { CadService } from '../cad/cad-service.service';
// import { AlertController, Loading, LoadingController, NavController } from 'ionic-angular';
import { ConnectionServiceProvider } from './conexao/connection-service';
import { FormularioAnexoService } from './formularioAnexo/FormularioAnexoService';
import { Parametro } from './formularioAnexo/Parametro';





@Injectable()
export class FormBase {
    public FECHAR: string = "fechar";
    public SUCESSO: string = "sucesso";
    public abertoFechado: boolean = false;
    public listFeriadPresta: any[];
    public isFeriado = false;
    // loading: Loading;



    constructor(public formService: FormularioAnexoService,
        public connectivityServer: ConnectionServiceProvider,
         public loadingCtrl: LoadingController,
          public cadService: CadService, 
          public alertCtrl: AlertController
        //   public translateService: TranslateService
          ) { }

    abrirModulo(value: string, abertoFechado: boolean) {
        this.abertoFechado = abertoFechado;
        this.abertoFechado = !this.abertoFechado;
    }

    async abrirAlertInfo(str: string, str1: string) {
        const loading = await this.loadingCtrl.create({
            spinner: null,
            duration: 5000,
            message: 'Click the backdrop to dismiss early...',
            translucent: true,
            cssClass: 'custom-class custom-loading',
            backdropDismiss: true
        });
        await loading.present();

        const { role, data } = await loading.onDidDismiss();
        console.log('Loading dismissed with role:', role);
    }



    getTipPresta(idTipo) {
        let nomePrestador = "";
        switch (Number(idTipo)) {
            case 1: nomePrestador = 'MEDICO'; break;
            case 2: nomePrestador = 'ENFERMEIRO (A)'; break;
            case 3: nomePrestador = 'TECNICOS DE ENFERMAGEM'; break;
            case 4: nomePrestador = 'FISIOTERAPEUTA'; break;
            case 5: nomePrestador = 'NUTRICIONISTA'; break;
            case 7: nomePrestador = 'PSICOLOGIA'; break;
            case 8: nomePrestador = 'FONOAUDIOLOGIA'; break;
            case 9: nomePrestador = 'FARMACEUTICO'; break;
            case 10: nomePrestador = 'JURIDICO'; break;
            case 11: nomePrestador = 'FISIOTERAPEUTA (PARTICULAR)'; break;
            case 12: nomePrestador = 'MEDICO (PARTICULAR)'; break;
            case 13: nomePrestador = 'NUTRICIONISTA (PARTICULAR)'; break;
            case 14: nomePrestador = 'FONOAUDIOLOGIA (PARTICULAR)'; break;
            case 15: nomePrestador = 'PSICOLOGIA (PARTICULAR)'; break;
            case 16: nomePrestador = 'COORDENADORA PRIME'; break;
            case 17: nomePrestador = 'TECNOLOGIA DA INFORMACAO'; break;
            case 18: nomePrestador = 'AUXILIAR DE ENFERMAGEM'; break;
            case 19: nomePrestador = 'TERAPEUTA OCUPACIONAL'; break;
            case 20: nomePrestador = 'MEDICO INDICADOR'; break;
            case 21: nomePrestador = 'EDUCADOR FISICO'; break;
            case 22: nomePrestador = 'ANTIGO - ENFERMAGEM SUPERVISAO'; break;
            case 23: nomePrestador = 'ENFERMAGEM - CURABEM'; break;
            case 24: nomePrestador = 'ASSISTENTE ADM - PEP'; break;
            case 25: nomePrestador = 'ENFERMAGEM - FIQBEM'; break;
            case 26: nomePrestador = 'ENFERMAGEM - EXPANSAO'; break;
            case 27: nomePrestador = 'ENFERMAGEM - AUDITORIA'; break;
            case 28: nomePrestador = 'SUPERVISORAS DE ENFERMAGEM'; break;
            case 29: nomePrestador = 'PEP - APOIO ADMINISTRATIVO'; break;
            case 30: nomePrestador = 'CAD - PEP'; break;
            case 31: nomePrestador = 'PEP - DURMABEM'; break;
            case 32: nomePrestador = 'TECNICOS CURABEM'; break;
            case 33: nomePrestador = 'FARMACEUTICA CLINICA'; break;
            case 34: nomePrestador = 'TECNICOS AD'; break;
            case 35: nomePrestador = 'CCID'; break;
            case 36: nomePrestador = 'ASSISTENTE SOCIAL'; break;
            case 37: nomePrestador = 'NUCLEO ASSISTENCIAL'; break;
            case 38: nomePrestador = 'COORDENACAO MEDICA'; break;
            case 39: nomePrestador = 'MEDICO AMBULATORIAL/FIQBEM'; break;
            case 40: nomePrestador = 'MEDICO AUDITOR'; break;
            case 41: nomePrestador = 'ENFERMEIRA MONITORA'; break;
            case 42: nomePrestador = 'FIQBEM PROMOÇÃO EM SÁUDE'; break;
            case 43: nomePrestador = 'ATENÇÃO PRIMÁRIA (MÉDICOS)'; break;
            case 44: nomePrestador = 'FONOAUDIOLOGIA TERCEIRIZADA'; break;
            case 45: nomePrestador = 'TÉCNICO DE ENF INTERNE PRIME'; break;
            case 46: nomePrestador = 'ATENÇÃO PRIMÁRIA (EQUIPE MULTI'; break;
            case 47: nomePrestador = 'MONITORAMENTO COVID-19'; break;
            case 48: nomePrestador = 'PEP - ACESSO GREEN'; break;
        }

        return nomePrestador;
    }


    // abrirAlertSucesso(str: string, str1: string) {
    //     let alert = this.alertCtrl.create({
    //         title: "<font color='32DB64' >" + this.traduzirCampo(str) + "</font>",
    //         message: this.traduzirCampo(str1),
    //         enableBackdropDismiss: false,
    //         buttons: [{
    //             text: this.traduzirCampo(this.FECHAR),
    //             handler: data => {

    //             }
    //         }]
    //     });
    //     alert.present();
    // }

    removerEspacoString(campo) {
        return campo.replace(/ /g, '');
    }



    // abrirAlertFalha(text) {
    //     let alert = this.alertCtrl.create({
    //         title: "<font color='red' >" + "Antenção:" + "</font>",
    //         subTitle: text,
    //         enableBackdropDismiss: false,
    //         buttons: ["Fechar"]
    //     });
    //     alert.present();
    // }

    // abrirAlertImg(base64, nome) {
    //     let alert = this.alertCtrl.create({
    //         title: "<font color='32DB64' >" + this.traduzirCampo(nome) + "</font>",
    //         subTitle: "<img  [src]='imagemBase64'" + "/>",
    //         message: this.traduzirCampo(nome),
    //         enableBackdropDismiss: false,
    //         buttons: [{
    //             text: this.traduzirCampo(this.FECHAR),
    //             handler: data => {
    //                 this.loading.dismiss();
    //               }
    //         }]
    //     });
    //     alert.present();
    // }

    // abrirAlertErro(text) {
    //     let alert = this.alertCtrl.create({
    //         title: "<font color='red' >" + "Erro, Contate o Administrador:" + "</font>",
    //         subTitle: text,
    //         enableBackdropDismiss: false,
    //         buttons: ["Fechar"]
    //     });
    //     alert.present();
    // }

    // traduzirCampo(texto: string) {
    //     this.translateService.get(texto).subscribe(
    //         value => {
    //             texto = value;
    //         }
    //     )
    //     return texto;
    // }

    simOuNao(valor) {
        return valor == 1 ? "Sim" : "Não";
    }

    retornaDescricaoCombo(lista: any[], codigo: string) {
        var descricao: string = "";
        lista.forEach(val => {
            if (val.codigo == codigo) {
                descricao = val.descricao;
            }
        });
        return descricao;
    }

    // showLoading() {
    //     this.loading = this.loadingCtrl.create({
    //     });
    //     this.loading.present();
    // }


    async presentLoading() {
        const loading = await this.loadingCtrl.create({
            cssClass: 'my-custom-class',
            message: 'Please wait...',
            duration: 2000
        });
        await loading.present();

        const { role, data } = await loading.onDidDismiss();
        console.log('Loading dismissed!');
    }

    async presentLoadingWithOptions() {
        const loading = await this.loadingCtrl.create({
            spinner: null,
            duration: 5000,
            message: 'Click the backdrop to dismiss early...',
            translucent: true,
            cssClass: 'custom-class custom-loading',
            backdropDismiss: true
        });
        await loading.present();

        const { role, data } = await loading.onDidDismiss();
        console.log('Loading dismissed with role:', role);
    }


    formatDat(dat) {
        const year = dat.slice(0, 4);
        const month = dat.slice(5, 7);
        const day = dat.slice(8, 10);

        return day + "/" + month + "/" + year;
    }

    formatDateLocal(dat) {
        const day = dat.slice(0, 3);
        const month = dat.slice(3, 6);
        const year = dat.slice(6, 10);

        return day + month + year;
    }

    formatDate(dat) {
        const day = dat.slice(0, 2);
        const month = dat.slice(3, 5);
        const year = dat.slice(6, 10);
        return year + "-" + month + "-" + day;
    }


    convertListaString(lista) {
        let itensString: string = "";
        lista.forEach(element => {
            itensString = itensString + "\r" + element;
        });
        return itensString;
    }
    converterListaComponentesString(lista) {
        let itensString: string = "";
        let x = " ";
        lista.forEach(element => {
            if (itensString == "") {

                if (element.dsTipPresc != null) {
                    itensString = itensString + " - " + element.dsTipPresc + x;
                }
                if (element.qtComponente != null) {
                    itensString = itensString + element.qtComponente + x;
                }
                if (element.setDsTipFrenquencia != null) {
                    itensString = itensString + element.setDsTipFrenquencia + x;
                }

                if (element.dsItPresc != null) {
                    itensString = itensString + element.dsItPresc + x;
                }

            } else {
                itensString = itensString + "\r ";

                if (element.dsTipPresc != null) {
                    itensString = itensString + " - " + element.dsTipPresc + x;
                }
                if (element.qtComponente != null) {
                    itensString = itensString + element.qtComponente + x;
                }


                if (element.setDsTipFrenquencia != null) {
                    itensString = itensString + element.setDsTipFrenquencia + x;
                }


                if (element.dstIPPresc != null) {
                    itensString = itensString + element.dstIPPresc + x;
                }
            }
        });

        return itensString;
    }


    covnvertListaItemPrescricaoString(lista) {
        let itensString: string = "";
        let x = " "
        lista.forEach(element => {
            if (itensString == "") {

                if (element.dsTipPresc != null) {
                    itensString = " - " + element.dsTipPresc + x;
                }

                if (element.dsTipFrenquencia != null) {
                    itensString = itensString + element.dsTipFrenquencia + x;
                }

                if (element.dtInicial != null) {
                    itensString = itensString + element.dtInicial + x;
                }

                if (element.dtFinal != null) {
                    itensString = itensString + element.dtFinal + x;
                }

                if (element.listaComponente.length > 0) {

                    itensString = itensString + "\r COMPONENTES: " + "\r" + this.converterListaComponentesString(element.listaComponente);
                }
            } else {
                itensString = itensString + " \r ";
                if (element.dsTipPresc != null) {
                    itensString = itensString + " - " + element.dsTipPresc + x;
                }

                if (element.dsTipFrenquencia != null) {
                    itensString = itensString + element.dsTipFrenquencia + x;
                }

                if (element.dtInicial != null) {
                    itensString = itensString + element.dtInicial + x + " Até "
                }

                if (element.dtFinal != null) {
                    itensString = itensString + element.dtFinal + x;
                }

                if (element.listaComponente.length > 0) {
                    itensString = itensString + "\r COMPONENTES: " + "\r" + this.converterListaComponentesString(element.listaComponente);
                }
            }
        });

        return itensString;
    }

    covnvertListaItemProdutoString(lista) {
        let itensString: string = "";
        lista.forEach(element => {
            if (itensString == "") {
                itensString = element.produtoEspecificoNome + " - " + element.produtoEspecificoTamanho + " - " + element.produtoEspecificoQtd;
            } else {
                itensString = itensString + ", " + element.produtoEspecificoNome + " - " + element.produtoEspecificoTamanho + " - " + element.produtoEspecificoQtd;
            }
        });

        return itensString;
    }

    formatDatEn(dat) { //27/08/2020
        console.log(dat);
        const year = dat.slice(6, 10);
        const month = dat.slice(3, 5);
        const day = dat.slice(0, 2);

        return year + "-" + month + "-" + day;
    }

    getParametros(obj, valcheckbox = false) {
        var parametros: Parametro[] = new Array<Parametro>();

        for (var chave in obj) {
            var par = new Parametro();
            par.chave = this.replaceCampoParaParametro(chave);
            if (obj[chave] != undefined || obj[chave] != null) {
                if (valcheckbox == true) {
                    if (obj[chave] == "true" || obj[chave] === true) {
                        par.valor = "1";
                    } else if (obj[chave] === "false" || obj[chave] === false) {
                        par.valor = "2";
                    } else {
                        par.valor = obj[chave];
                    }
                } else if (typeof par.valor === "boolean") {
                    if (obj[chave] === true) {
                        par.valor = "1";
                    } else if (obj[chave] === false) {
                        par.valor = "2";
                    } else {
                        par.valor = obj[chave];
                    }
                } else {
                    par.valor = obj[chave];
                }
            }
            //parametros.set(this.replaceCampoParaParametro(chave), obj[chave]);
            else {
                par.valor = "";
                //parametros.set(this.replaceCampoParaParametro(chave), null);
            }
            parametros.push(par);
        }
        console.log("*********************************************parametros*********************");

        console.log(parametros);
        return parametros;
    }

    ordernarLista(lista) {
        console.log(lista);
        lista.sort(function (a, b) {
            return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0);
        });
        console.log(lista);
        return lista;
    }

    replaceCampoParaParametro(campo) {

        var parametro: String = campo;

        while (parametro.indexOf("A") > 1 || parametro.indexOf("B") > 1 ||
            parametro.indexOf("C") > 1 || parametro.indexOf("D") > 1 ||
            parametro.indexOf("E") > 1 || parametro.indexOf("F") > 1 ||
            parametro.indexOf("G") > 1 || parametro.indexOf("H") > 1 ||
            parametro.indexOf("I") > 1 || parametro.indexOf("J") > 1 ||
            parametro.indexOf("K") > 1 || parametro.indexOf("L") > 1 ||
            parametro.indexOf("M") > 1 || parametro.indexOf("N") > 1 ||
            parametro.indexOf("O") > 1 || parametro.indexOf("P") > 1 || parametro.indexOf("Q") > 1 ||
            parametro.indexOf("R") > 1 || parametro.indexOf("S") > 1 ||
            parametro.indexOf("T") > 1 || parametro.indexOf("U") > 1 ||
            parametro.indexOf("V") > 1 || parametro.indexOf("W") > 1 ||
            parametro.indexOf("X") > 1 || parametro.indexOf("Y") > 1 ||
            parametro.indexOf("Z") > 1) {

            parametro = parametro.replace("A", "_a");
            parametro = parametro.replace("B", "_b");
            parametro = parametro.replace("C", "_c");
            parametro = parametro.replace("D", "_d");
            parametro = parametro.replace("E", "_e");
            parametro = parametro.replace("F", "_f");
            parametro = parametro.replace("G", "_g");
            parametro = parametro.replace("H", "_h");
            parametro = parametro.replace("I", "_i");
            parametro = parametro.replace("J", "_j");
            parametro = parametro.replace("K", "_k");
            parametro = parametro.replace("L", "_l");
            parametro = parametro.replace("M", "_m");
            parametro = parametro.replace("N", "_n");
            parametro = parametro.replace("O", "_o");
            parametro = parametro.replace("P", "_p");
            parametro = parametro.replace("Q", "_q");
            parametro = parametro.replace("R", "_r");
            parametro = parametro.replace("S", "_s");
            parametro = parametro.replace("T", "_t");
            parametro = parametro.replace("U", "_u");
            parametro = parametro.replace("V", "_v");
            parametro = parametro.replace("W", "_w");
            parametro = parametro.replace("X", "_x");
            parametro = parametro.replace("Y", "_y");
            parametro = parametro.replace("Z", "_z");

        }

        parametro = "R_" + parametro.toUpperCase();

        return parametro;
    }

    removerAcentos(newStringComAcento) {
        var stringSemAcento = newStringComAcento;
        var mapaAcentosHex = {
            a: /[\xE0-\xE6]/g,
            e: /[\xE8-\xEB]/g,
            i: /[\xEC-\xEF]/g,
            o: /[\xF2-\xF6]/g,
            u: /[\xF9-\xFC]/g,
            c: /\xE7/g,
            n: /\xF1/g
        };

        for (var letra in mapaAcentosHex) {
            var expressaoRegular = mapaAcentosHex[letra];
            stringSemAcento = stringSemAcento.replace(expressaoRegular, letra);
        }

        return stringSemAcento;
    }



    // getFeriado() {
    //     return new Promise((result, reject) => {
    //         this.cadService.isFeriado(new Date().getDay(), new Date().getMonth()).subscribe(data => {
    //             if (data) {
    //                 this.isFeriado = data;
    //             }
    //             result(true);
    //         }, erro => {
    //             console.log(erro);
    //             this.abrirAlertFalha(erro);
    //             reject(false);
    //         });
    //     });
    // }

    // setMensagem(texto) {
    //     const showHelloToast = async (texto) => {
    //         await Toast.show({
    //             text: texto,
    //         });
    //     };
    // }
}


