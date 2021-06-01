import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform } from '@ionic/angular';
import { ConnectionServiceProvider } from 'src/app/util/conexao/connection-service';
import { FormBase } from 'src/app/util/FormBase';
import { UtilProvider } from 'src/app/util/util';
import { Paciente } from '../../page/paciente/Paciente';
import { Usuario } from '../../page/usuario/Usuario';
import { EvolucaoCancelada } from './evolucao-cancelada';
import { Evolucao } from './evolucaoDTO';
import { ListaEvolucoes } from './lista-evolucoes';
import { MenuEvolucoes } from './menu-evolucoes';
import { MenuPacientes } from './menu-pacientes';
import { EvolucaoService } from './minhas-evoluces-service';

@Component({
  selector: 'app-minhas-evolucoes',
  templateUrl: './minhas-evolucoes.page.html',
  styleUrls: ['./minhas-evolucoes.page.scss'],
})
export class MinhasEvolucoesPage implements OnInit {

 
  public listaTipoDocumento: any[];
  public listaTodasEvolucoes: ListaEvolucoes[];
  public listaTemp: ListaEvolucoes[];
  public listaEvolucaoSelecionada: ListaEvolucoes[];
  public listaPacienteSelecionado: ListaEvolucoes[];

  public listaEvolucoesPaciente: ListaEvolucoes[];
  public opcaoSelecionada: string;

  public nomeEvolucaoSelecionada: string;
  public menuPacienteSelecionado = new MenuPacientes;
  public minhasEvolucoes: boolean = true;
  public todosPacientes: boolean = true;

  public menuEvolucoes: any[];
  public menuEvolucoesTemp: any[];
  public nomeEvolucao: string;

  public evolucoesPaciente: MenuEvolucoes[];
  public evolucoesPacientetemp: MenuEvolucoes[];

  public evolucao: Evolucao;
  public menuEvolucao: MenuEvolucoes;

  public menuPaciente: MenuPacientes;

  public listaDocumentoPai: ListaEvolucoes[];
  public listaEvolucoesPacienteTemp: ListaEvolucoes[];
  public evolucaoCancelada = new EvolucaoCancelada;
  public codigoPdfSelecionado: string ='0';
  public tipoExtensaoSelecionada: string = "";

  public qtdEvolucoes = 0;


  usuario: Usuario;
  paciente: Paciente;
  public codigoUsuario = "";
  public codUsu = "";
  public codigoPaciente = "0";
  public tituloPage = "";
  public isUsuarioDocEvolucao: boolean = false;
  public pdf = Object;
  public imagemBase64 = "";
  // public _imageViewerCtrl: ImageViewerController;
  public agruparPorPaciente = "1";
  public isWeb = false;
  public isPlatform = "";
  public base64 = "";


  public dataInicio = new Date().toISOString();
  public dataFim = new Date().toISOString();
  // public connectivityServer: ConnectionServiceProvider;
  // public evolucaoService: EvolucaoService;
  // public navCtrl: NavController;
  // public navParams: NavParams;
  // public formBase: FormBase;
  // public util: UtilProvider; 
  // public file: File;
  // public platform: Platform;
  public dataAtual = null; 

  
  constructor(
    public connectivityServer: ConnectionServiceProvider,
  public evolucaoService: EvolucaoService,
  public navCtrl: NavController,
  public navParams: NavParams,
  public formBase: FormBase,
  public util: UtilProvider, 
  // public file: File,
  public platform: Platform
    
     ) {
    this.dataAtual = this.formBase.formatDate(new Date().toLocaleDateString());
    // this.usuario = this.util.usuario;
    // this.codigoUsuario = this.util.usuario.codigo.toUpperCase();
    // this.paciente = this.util.paciente;
    this.minhasEvolucoes = false;
    this.todosPacientes = false;
    // this.minhasEvolucoes = this.navParams.get('minhasEvolucoes');
    // this.todosPacientes = this.navParams.get('todosPacientes');
    this.tituloPage = this.minhasEvolucoes ? "Doc de Prontuário" : "Histórico de Prontuário";
    // this._imageViewerCtrl = imageViewerCtrl;
  }

  ionViewDidLoad() {
  }


  getPlatform() {
    localStorage.getItem('platform');
  }

  onSearchCancel() {
    this.menuEvolucoes = this.menuEvolucoesTemp;
    this.nomeEvolucao = "";
    this.evolucoesPaciente = this.evolucoesPacientetemp;
    this.menuPacienteSelecionado = new MenuPacientes;
    this.nomeEvolucaoSelecionada = "";
    this.qtdEvolucoes = this.sumCampoLista(this.menuEvolucoes);
  }

  presentImage(myImage) {
    // const imageViewer = this.imageViewerCtrl.create(myImage);
    // imageViewer.getImplementation();
  }

  pesquisarEvolucao() {
    this.menuEvolucoes = this.menuEvolucoesTemp.filter((item) => item.nome.toString().toLowerCase().indexOf(this.nomeEvolucao.toLowerCase()) > -1);
    this.qtdEvolucoes = this.sumCampoLista(this.menuEvolucoes);
  }

  pesquisarPEP() {
    this.evolucoesPaciente = this.evolucoesPacientetemp.filter((item) => item.nome.toString().toLowerCase().indexOf(this.nomeEvolucao.toLowerCase()) > -1);
    this.qtdEvolucoes = this.sumCampoLista(this.menuEvolucoes);
  }

  pesquisarPaciente() {
    console.log(this.menuEvolucoesTemp);
    this.menuEvolucoes = this.menuEvolucoesTemp.filter((item) => item.nome.toString().toLowerCase().indexOf(this.nomeEvolucao.toLowerCase()) > -1);
    this.qtdEvolucoes = this.sumCampoLista(this.menuEvolucoes);
  }


  base64toBlob(base64Data, contentType) {
    contentType = contentType;
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  base64ToBlob(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; ++i) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return new Blob([bytes], { type: 'application/pdf' });
  };

  getEvolucaoSelecionada(nomeEvolucao) {
    this.nomeEvolucaoSelecionada = nomeEvolucao == this.nomeEvolucaoSelecionada ? "0" : this.nomeEvolucaoSelecionada = nomeEvolucao;
    this.listaEvolucaoSelecionada = this.listaTodasEvolucoes.filter(item => item.nomeEvolucao == nomeEvolucao);
    //this.listaEvolucoesPaciente = this.listaTodasEvolucoes.filter(item => item.nomeEvolucao == nomeEvolucao);
    console.log(this.listaEvolucaoSelecionada);

  }

  getEvolucaoSelecionadaPaciente(nomeEvolucao) {
    this.nomeEvolucaoSelecionada = nomeEvolucao == this.nomeEvolucaoSelecionada ? "0" : this.nomeEvolucaoSelecionada = nomeEvolucao;
    this.listaEvolucaoSelecionada = this.listaTodasEvolucoes.filter(item => item.nomeEvolucao == nomeEvolucao && item.codigoPaciente == this.menuPacienteSelecionado.codigo);
    console.log(this.listaEvolucaoSelecionada);

  }

  getPacienteSelecionado(menu: MenuPacientes) {
    this.menuPaciente = menu;
    this.nomeEvolucaoSelecionada = "";
    this.menuPaciente.selecionado = menu.selecionado == "selecionado" ? "" : "selecionado";
    this.listaEvolucoesPaciente = this.listaTodasEvolucoes.filter(item => item.codigoPaciente == menu.codigo);
    this.menuPacienteSelecionado = menu.codigo === this.menuPacienteSelecionado.codigo ? new MenuPacientes : menu;
    this.listaPacienteSelecionado = this.listaTodasEvolucoes.filter(item => item.codigoPaciente == menu.codigo);
    this.agruparEvolucoesPaciente(this.listaPacienteSelecionado);
    console.log(this.listaEvolucaoSelecionada);

  }

  getSelecao(item: any, idTipo :number){
    console.log(item);
    return idTipo == 2? this.getEvolucaoSelecionada(item.nome) : this.getPacienteSelecionado(item);
  }

  ngOnInit() {

    // console.log(new Date().toISOString());
    console.log(new Date().toLocaleString());
    // console.log(new Date().toDateString());
    // console.log(new Date().setUTCDate(55));
    console.log(new Date().toLocaleTimeString());

    this.codUsu = 'TI.MEDICO';
    this.todosPacientes = true;

    this.codigoPaciente = this.todosPacientes ? "0" : this.paciente.codigo.toString();
    this.codUsu = this.minhasEvolucoes ? this.usuario.codigo : "0";
    // this.getEvolucoes(this.codUsu, this.formBase.formatDat(this.dataInicio), this.formBase.formatDat(this.dataInicio), this.codigoPaciente);
    // this.getEvolucoes(this.codUsu, this.formBase.formatDat(this.dataInicio), this.formBase.formatDat(this.dataInicio), this.codigoPaciente);
    this.getEvolucoes(this.codUsu, this.formBase.formatDat(this.dataInicio), this.formBase.formatDat(this.dataInicio), this.codigoPaciente);

  }

//   formatDate(dat) {
//     const day = dat.slice(0, 2);
//     const month = dat.slice(3, 5);
//     const year = dat.slice(6, 10);
//     return year + "-" + month + "-" + day;
// }

//   formatDat(dat) {
//     const year = dat.slice(0, 4);
//     const month = dat.slice(5, 7);
//     const day = dat.slice(8, 10);

//     return day + "/" + month + "/" + year;
// }
  cancelarEvolucao(descricao, item) {
    if (descricao == null || descricao == "") {
      // this.formBase.abrirAlertFalha("É obrigatório informar a justificativa!");
            alert("É obrigatório informar a justificativa!");

    } else {
      if (this.connectivityServer.isOnline()) {
        // this.formBase.showLoading();
        this.evolucaoCancelada = {
          codigoDocumento: item.codigoDocumento,
          codigoUsuario: this.usuario.codigo,
          justificativa: descricao
        }
        this.evolucaoService.cancelarEvolucao(this.evolucaoCancelada).subscribe(response => {
          // this.formBase.loading.dismiss();
          // this.formBase.abrirAlertSucesso("Evolução Cancelada", descricao);
          this.getEvolucoesData();

        },
          error => {
            alert(error.error.mensagem);
            // this.formBase.loading.dismiss();
            // this.formBase.abrirAlertErro(error.error.mensagem);
          })
      } else {
               alert("Sem conexão com a Internet. Reestabeleça a conexão e tente novamente.");

        // this.formBase.abrirAlertFalha("Sem conexão com a Internet. Reestabeleça a conexão e tente novamente.");
        // this.formBase.loading.dismiss();
      }

    }
    // this.formBase.loading.dismissAll();

  }

  criarCancelamento(item: ListaEvolucoes) {
    // this.abrirAlertCancelamento(item);
    if (item.status === "CANCELADO") {
      alert('Evolução selecionada já está com status: Cancelada.')

      // this.formBase.abrirAlertFalha('Evolução selecionada já está com status: Cancelada.')
    } else if (!item.permitirCancelar && this.codigoUsuario.toUpperCase() != "DBAMV") {
      alert('Só é permitido cancelar evolução do dia atual, para datas anteriores é necessário solicitar ao seu coordenador.')

      // this.formBase.abrirAlertFalha('Só é permitido cancelar evolução do dia atual, para datas anteriores é necessário solicitar ao seu coordenador.')
      // this.abrirAlertCancelamento(item);

    } else {
      this.abrirAlertCancelamento(item);
    }
  }

  abrirAlertCancelamento(item: ListaEvolucoes) {
    alert("cancelar")
    // let alert = this.formBase.alertCtrl.create({
    //   enableBackdropDismiss: false,
    //   title: 'Cancelar Evolução',
    //   inputs: [
    //     {
    //       name: 'descricao',
    //       placeholder: 'Justificativa',
    //       type: 'text',
    //     },
    //   ],
    //   buttons: [
    //     {
    //       text: 'Não',
    //       role: 'cancel',
    //       handler: data => {
    //       }
    //     },
    //     {
    //       text: 'Sim',
    //       handler: data => {
    //         this.cancelarEvolucao(data.descricao, item);
    //       }
    //     }
    //   ]
    // });
    // alert.present();
  }

  getEvolucoesData() {

    if (this.dataInicio && this.dataFim != null) {
      this.menuPacienteSelecionado.codigo = "0";
      this.getEvolucoes(this.codUsu, this.formBase.formatDat(this.dataInicio), this.formBase.formatDat(this.dataFim), this.codigoPaciente);
    }
    if (this.dataInicio > this.dataFim) {
     alert("Data fim não pode ser menor que a data inicial.");

      // this.formBase.abrirAlertFalha("Data fim não pode ser menor que a data inicial.");
    }
    this.onSearchCancel();


  }

  getEvolucoes(codUsu, dataInicio, dataFim, codigoPaciente) {

    // this.formBase.showLoading();
    this.menuEvolucoes = new Array();
    this.menuEvolucoesTemp = new Array();
    if (this.connectivityServer.isOnline()) {
      this.evolucaoService.retornarListaEvolucoes(codUsu, dataInicio, dataFim, codigoPaciente).subscribe(val => {
        this.listaTodasEvolucoes = val;
        console.log(val);
        this.qtdEvolucoes = this.listaTodasEvolucoes.length;
        this.listaDocumentoPai = val;

        if (this.agruparPorPaciente == '1') {
          this.montarMenuPorPaciente()
        } else {
          this.montarMenuPorEvolucao();

        }
      },
        erro => {
          console.log(erro);
          alert(erro.error.mensagem);

          // this.formBase.abrirAlertErro(erro.error.mensagem);
          // this.formBase.loading.dismissAll();
        });

    } else {
      alert("Sem conexão com a Internet. Reestabeleça a conexão e tente novamente.");
      // this.formBase.abrirAlertFalha("Sem conexão com a Internet. Reestabeleça a conexão e tente novamente.");
      // this.formBase.loading.dismiss();
    }
  }

  setAgrupador() {
    if (this.agruparPorPaciente == '1') {
      this.montarMenuPorPaciente();
      this.listaEvolucaoSelecionada = [];
    } else {
      this.montarMenuPorEvolucao();
    }
  }

  montarMenuPorEvolucao() {

    while (this.listaDocumentoPai.length > 0) {
      console.log(this.listaDocumentoPai);
      this.listaTemp = this.listaDocumentoPai.filter(item => item.nomeEvolucao == this.listaDocumentoPai[0].nomeEvolucao);
      this.listaDocumentoPai = this.listaDocumentoPai.filter(item => item.nomeEvolucao != this.listaTemp[0].nomeEvolucao);

      this.menuEvolucao = {
        nome: this.listaTemp[0].nomeEvolucao,
        codigoObjeto: this.listaTemp[0].codigoObjeto,
        qtd: this.listaTemp.length,
        selecionado: "",

      }
      this.menuEvolucoes.push(this.menuEvolucao);
    }

    this.menuEvolucoes.sort(function (a, b) {
      return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0);
    });



    this.menuEvolucoesTemp = this.menuEvolucoes;
    // this.formBase.loading.dismissAll();
    this.listaDocumentoPai = this.listaTodasEvolucoes;
    console.log(this.menuEvolucoes);
  }

  sumCampoLista(lista) {
    let total = 0;
    lista.forEach(val => {
      total = total + val.qtd;
    })
    return total;
  }

  agruparEvolucoesPaciente(listaPaciente) {
    this.evolucoesPaciente = new Array();

    while (listaPaciente.length > 0) {
      this.listaTemp = listaPaciente.filter(item => item.nomeEvolucao == listaPaciente[0].nomeEvolucao);
      listaPaciente = listaPaciente.filter(item => item.nomeEvolucao != this.listaTemp[0].nomeEvolucao);

      this.evolucao = {
        nome: this.listaTemp[0].nomeEvolucao,
        codigoObjeto: this.listaTemp[0].codigoObjeto,
        qtd: this.listaTemp.length,
        codigoPaciente: this.listaTemp[0].codigoPaciente,
        selecionado: "",

      }
      this.evolucoesPaciente.push(this.evolucao);
    }

    console.log(this.evolucoesPaciente);
    this.evolucoesPaciente = this.formBase.ordernarLista(this.evolucoesPaciente);
    console.log(this.evolucoesPaciente);

    this.evolucoesPacientetemp = this.evolucoesPaciente;

    // this.formBase.loading.dismissAll();
  }

  // ordernarLista(lista) {
  //   console.log(lista);
  //   lista.sort(function (a, b) {
  //     return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0);
  //   });
  //   console.log(lista);
  //   return lista;
  // }

  // ordernarListaNumber(lista: any[], a: number, b: number) {
  //   console.log(lista);
  //   lista.sort(function () {
  //     return (a > b) ? 1 : ((b > a) ? -1 : 0);
  //   });
  //   console.log(lista);
  //   return lista;
  // }

  montarMenuPorPaciente() {

    while (this.listaDocumentoPai.length > 0) {
      this.listaTemp = this.listaDocumentoPai.filter(item => item.codigoPaciente == this.listaDocumentoPai[0].codigoPaciente);
      this.listaDocumentoPai = this.listaDocumentoPai.filter(item => item.codigoPaciente != this.listaTemp[0].codigoPaciente);
      console.log(this.listaTemp);


      this.menuPaciente = {
        nome: this.listaTemp[0].nomePaciente,
        codigo: this.listaTemp[0].codigoPaciente,
        qtd: this.listaTemp.length,
        selecionado: "",
      }
      this.menuEvolucoes.push(this.menuPaciente);
    }
    this.menuEvolucoes.sort(function (a, b) {
      return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0);
    });

    this.menuEvolucoesTemp = this.menuEvolucoes;
    this.listaDocumentoPai = this.listaTodasEvolucoes;
    // this.formBase.loading.dismissAll();


  }

  openPdf(item) {

    this.codigoPdfSelecionado = item.codigoPdf;
    this.tipoExtensaoSelecionada = item.tipoExtensao;
    this.imagemBase64 = item.tipoExtensao != 'PDF' ? "" : this.imagemBase64;
    // this.formBase.showLoading();
    this.evolucaoService.getPdf(item.codigoPdf).subscribe(rs => {
      this.pdf = rs;
    //  this.salvarPdfLocal(rs, item.tipoExtensao, item.nomeEvolucao);
      console.log(item);
      this.openPdfWeb(this.pdf);

    }, error => {
      // this.formBase.loading.dismiss();
    alert(error.message);
      // this.formBase.abrirAlertErro(error.message);
      console.log(error);
    });
  }


  setContentyTypeDecode(tipoExtensao) {
    let contentTypeBase64 = "";
    switch (tipoExtensao) {
      case 'PDF': contentTypeBase64 = 'application/pdf;base64'; break;
      case 'PNG': contentTypeBase64 = 'data:image/png;base64'; break;
      case 'JPEG': contentTypeBase64 = 'data:image/jpeg;base64'; break;
      case 'JPG': contentTypeBase64 = 'data:image/jpg;base64'; break;
    }

    return contentTypeBase64;
  }

  setContentyType(tipoExtensao) {
    let contentType = "";
    switch (tipoExtensao) {
      case 'PDF': contentType = 'application/pdf'; break;
      case 'PNG': contentType = 'data:image/png'; break;
      case 'JPEG': contentType = 'data:image/jpeg'; break;
      case 'JPG': contentType = 'data:image/jpg'; break;
    }
    return contentType;
  }


  getPdfBase64(item) {

    if (this.connectivityServer.isOnline()) {
      // this.formBase.showLoading();

    this.evolucaoService.getPdf(item.codigoPdf).subscribe(rs => {
        this.openPdfWeb(rs);  
        // this.formBase.loading.dismiss();
 
    }, error => {
      // this.formBase.loading.dismiss();
      alert(error.message);
      // this.formBase.abrirAlertErro(error.message);
      console.log(error);
    });
  
  } else {
    alert("Sem conexão com a Internet. Reestabeleça a conexão e tente novamente.");

    // this.formBase.abrirAlertFalha("Sem conexão com a Internet. Reestabeleça a conexão e tente novamente.");
    // this.formBase.loading.dismiss();
  }
}

  openPdfWeb(pdf){
    var base64 = pdf.base64;
    var novaJanela = window.open("", "PDF", 'dependent=yes,locationbar=no,scrollbars=no,menubar=no,resizable,screenX=50,screenY=50,width=850,height=800');
    novaJanela.document.write('<html><body><object width=100% height=100% type="application/pdf" data="data:application/pdf;base64,' + base64 + '"><embed type="application/pdf" src="data:application/pdf;base64,' + base64 + '"></embed></object></body></html>');
    novaJanela.window.focus();
  }


  salvarPdfLocal(pdf, tipoExtensao, nomeEvolucao) {
    // const options: IWriteOptions = {
    //   replace: true
    // }
    // if (tipoExtensao == 'PDF') {
    //   console.log(this.file.dataDirectory);
    //   //cdvfile://localhost/persistent/file

    //   this.file.writeFile(this.file.dataDirectory, nomeEvolucao + '.' + tipoExtensao, this.base64toBlob(pdf.base64, this.setContentyTypeDecode(tipoExtensao)), options).then((success) => {
    //     //Método para abrir o arquivo após salvá-lo no diretório
    //     this.fileOpen.open(success.toURL(), this.setContentyType(tipoExtensao)).then(() =>
    //       alert("ok")
    //       )
    //       .catch(error => {
    //         // this.formBase.loading.dismiss();
    //         alert(error.message)
    //         console.log(error);
    //       });
    //   }).catch((error) => {
    //     this.openPdfWeb(pdf);
    //     // this.formBase.loading.dismiss();
    //     // this.formBase.abrirAlertErro(error.message);
    //     console.log(error);
    //   });

    // } else {
    //   // this.formBase.loading.dismiss();
    //   this.imagemBase64 = this.setContentyTypeDecode(tipoExtensao) + ',' + pdf.base64;
    }

  }


