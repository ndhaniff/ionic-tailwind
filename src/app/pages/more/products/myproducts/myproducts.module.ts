import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyproductsPageRoutingModule } from './myproducts-routing.module';

import { MyproductsPage } from './myproducts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyproductsPageRoutingModule
  ],
  declarations: [MyproductsPage]
})
export class MyproductsPageModule {}
