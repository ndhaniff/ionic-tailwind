import { IonicModule } from '@ionic/angular'
import { SlidemenuComponent } from './slidemenu.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

@NgModule({
    declarations: [SlidemenuComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [SlidemenuComponent]
})
export class SlidemenuModule { }
