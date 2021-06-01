import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinhasEvolucoesPageRoutingModule } from './minhas-evolucoes-routing.module';

import { MinhasEvolucoesPage } from './minhas-evolucoes.page';
import { ConnectionServiceProvider } from 'src/app/util/conexao/connection-service';
import { EvolucaoService } from './minhas-evoluces-service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinhasEvolucoesPageRoutingModule
  ],
  declarations: [MinhasEvolucoesPage],
  providers:[]
})
export class MinhasEvolucoesPageModule {}
