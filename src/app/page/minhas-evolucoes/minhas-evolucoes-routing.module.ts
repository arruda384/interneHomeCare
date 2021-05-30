import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinhasEvolucoesPage } from './minhas-evolucoes.page';

const routes: Routes = [
  {
    path: '',
    component: MinhasEvolucoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinhasEvolucoesPageRoutingModule {}
