import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform } from '@ionic/angular';
import { ConnectionServiceProvider } from 'src/app/util/conexao/connection-service';
import { FormBase } from 'src/app/util/FormBase';
import { UtilProvider } from 'src/app/util/util';
import { EvolucaoService } from '../minhas-evolucoes/minhas-evoluces-service';


@Component({
  selector: 'app-teste',
  templateUrl: './teste.page.html',
  styleUrls: ['./teste.page.scss'],
})
export class TestePage implements OnInit {

  // private connectivityServer: ConnectionServiceProvider;
  // private evolucaoService: EvolucaoService;
  // private navCtrl: NavController;
  // private navParams: NavParams;
  // private formBase: FormBase;
  // private util: UtilProvider; 
  // private file: File;
  // private platform: Platform;

  constructor(
    private connectivityServer: ConnectionServiceProvider,
    private evolucaoService: EvolucaoService, 
    private navCtrl: NavController, 
    private navParams: NavParams, 
    private formBase: FormBase,
    private util: UtilProvider, 
    private file: File, 
    private platform: Platform
  ) { }

  ngOnInit() {
  }

}
