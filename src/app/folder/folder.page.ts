import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Share } from '@capacitor/share';
import { NavController, NavParams, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ConnectionServiceProvider } from '../util/conexao/connection-service';
import { UtilProvider } from '../util/util';
import { EvolucaoService } from './minhas-evolucoes/minhas-evoluces-service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  myImage = null;
  position: Position = null;
  public endereco = '';
  public cep = '';


  constructor(private activatedRoute: ActivatedRoute, public route: Router,public http: HttpClient
    ) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    this.myImage = image.webPath;
  }

  

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.position = coordinates;
  }

  async share() {
    await Share.share({
      title: 'Come and find me',
      text: `Here's my current location: 
        ${this.position.coords.latitude}, 
        ${this.position.coords.longitude}`,
      dialogTitle: "Minha localização"
    });
  } 

  getEnd(){
    this.cep = this.cep;
    this.getEnderecoPorCep(this.cep, 'json').subscribe(rs =>{
      this.endereco = rs;
    })

  }

  public getEnderecoPorCep(cep: string, tipoRetorno: string) {
    let url = "https://viacep.com.br/ws/" + cep + "/json";

    return this.http
        .get<any>(url)
        .pipe(
            tap(data => console.log('server data:', data)),
            catchError(this.handleError('CEP > Endereco'))
        );

};

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

  // async historicoEvolucoes(){
  //   let minhasEvolucoes: boolean = false;
  //   let todosPacientes: boolean = false;
    //this.route.navigate(['/minhas-evolucoes']);
    // alert('o');
   // this.route.navigate(['page/minhas-evolucoes']);

  // }

}
