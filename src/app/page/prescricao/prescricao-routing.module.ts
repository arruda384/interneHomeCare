import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrescricaoPage } from './prescricao.page';

const routes: Routes = [
  {
    path: '',
    component: PrescricaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrescricaoPageRoutingModule {}
