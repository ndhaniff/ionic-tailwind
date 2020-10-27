import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { MypurchasePageRoutingModule } from './mypurchase-routing.module'

import { MypurchasePage } from './mypurchase.page'
import { SlidemenuComponent } from '@components/slidemenu/slidemenu.component'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MypurchasePageRoutingModule,
    ],
    declarations: [MypurchasePage, SlidemenuComponent]
})
export class MypurchasePageModule { }
