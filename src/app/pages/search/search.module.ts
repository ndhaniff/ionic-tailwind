import { ProductcardModule } from './../../components/products/productcard/productcard.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { SearchPageRoutingModule } from './search-routing.module'

import { SearchPage } from './search.page'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SearchPageRoutingModule,
        ProductcardModule
    ],
    declarations: [SearchPage]
})
export class SearchPageModule { }
