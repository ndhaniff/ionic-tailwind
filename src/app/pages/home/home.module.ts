import { SlidemenuModule } from '@components/slidemenu/slidemenu.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { HomePage } from './home.page'

import { HomePageRoutingModule } from './home-routing.module'
import { ProductcardModule } from '@components/products/productcard/productcard.module'
import { ProducthorizontalModule } from '@components/products/producthorizontal/producthorizontal.module'


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        SlidemenuModule,
        ProductcardModule,
        ProducthorizontalModule
    ],
    declarations: [HomePage]
})
export class HomePageModule { }
