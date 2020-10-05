import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { ProductcardComponent } from './productcard.component'



@NgModule({
    declarations: [ProductcardComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [ProductcardComponent]
})
export class ProductcardModule { }
