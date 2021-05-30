import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoricoSolicitacoesPageRoutingModule } from './historico-solicitacoes-routing.module';

import { HistoricoSolicitacoesPage } from './historico-solicitacoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoricoSolicitacoesPageRoutingModule
  ],
  declarations: [HistoricoSolicitacoesPage]
})
export class HistoricoSolicitacoesPageModule {}
