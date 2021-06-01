import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
// import { IonicStorageModule } from "@angular/storage";
import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ConnectionServiceProvider } from './util/conexao/connection-service';
import { MinhasEvolucoesPageModule } from './folder/minhas-evolucoes/minhas-evolucoes.module';
import { EvolucaoService } from './folder/minhas-evolucoes/minhas-evoluces-service';
import { HttpClientModule } from '@angular/common/http';
import { FormBase } from './util/FormBase';
import { FormularioAnexoService } from './util/formularioAnexo/FormularioAnexoService';
import { UtilProvider } from './util/util';
import { CadService } from './cad/cad-service.service';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, MinhasEvolucoesPageModule, HttpClientModule,
     IonicModule.forRoot(), 
     
     AppRoutingModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  // Register the ServiceWorker as soon as the app is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
}),

],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy
    
    }, EvolucaoService, UtilProvider,
    ConnectionServiceProvider,
    NavParams, 
    FormBase,
    FormularioAnexoService,
    UtilProvider,
    CadService,
    Storage],
  bootstrap: [AppComponent],
})
export class AppModule {}
