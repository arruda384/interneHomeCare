import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoricoSolicitacoesPage } from './historico-solicitacoes.page';

const routes: Routes = [
  {
    path: '',
    component: HistoricoSolicitacoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoricoSolicitacoesPageRoutingModule {}
