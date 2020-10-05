import { ProducthorizontalComponent } from './producthorizontal.component'
import { IonicModule } from '@ionic/angular'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'



@NgModule({
    declarations: [ProducthorizontalComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [ProducthorizontalComponent]
})
export class ProducthorizontalModule { }
