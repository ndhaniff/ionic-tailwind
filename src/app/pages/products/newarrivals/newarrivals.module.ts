import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewarrivalsPageRoutingModule } from './newarrivals-routing.module';

import { NewarrivalsPage } from './newarrivals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewarrivalsPageRoutingModule
  ],
  declarations: [NewarrivalsPage]
})
export class NewarrivalsPageModule {}
