import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinhasEvolucoesPageRoutingModule } from './minhas-evolucoes-routing.module';

import { MinhasEvolucoesPage } from './minhas-evolucoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinhasEvolucoesPageRoutingModule
  ],
  declarations: [MinhasEvolucoesPage]
})
export class MinhasEvolucoesPageModule {}
