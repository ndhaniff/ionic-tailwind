import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { MyshopPage } from './myshop.page'

const routes: Routes = [
    {
        path: '',
        component: MyshopPage
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MyshopPageRoutingModule { }
