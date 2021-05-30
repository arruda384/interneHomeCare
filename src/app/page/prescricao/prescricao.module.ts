import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrescricaoPageRoutingModule } from './prescricao-routing.module';

import { PrescricaoPage } from './prescricao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrescricaoPageRoutingModule
  ],
  declarations: [PrescricaoPage]
})
export class PrescricaoPageModule {}
