import { ProductcardComponent } from './../../../components/products/productcard/productcard.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { MyshopPageRoutingModule } from './myshop-routing.module'

import { MyshopPage } from './myshop.page'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MyshopPageRoutingModule
    ],
    declarations: [MyshopPage, ProductcardComponent]
})
export class MyshopPageModule { }
