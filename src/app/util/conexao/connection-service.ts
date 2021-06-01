import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
// import { Network } from '@ionic-native/network';
// import { Platform } from 'ionic-angular'

@Injectable()
export class ConnectionServiceProvider {

  onDevice: boolean;

  constructor(public platform: Platform) {
    this.onDevice = this.platform.is('cordova');
    // console.log('ConnectionServiceProvider = ' + this.isOnline());
    // this.network.onDisconnect().subscribe(() => {
    //   console.log('Desconectado')
    // })
    // this.network.onConnect().subscribe(() => {
    //   console.log('Conectado')
    // })
  }

  public isOnline(): boolean {
    // if (this.onDevice && this.network.type) {
    //   return this.network.type !== 'none';
    // } else {
    //   return navigator.onLine;
    // }

    return true;
  }

}
