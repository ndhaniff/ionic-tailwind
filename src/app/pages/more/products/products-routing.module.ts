import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ProductsPage } from './products.page'

const routes: Routes = [
    {
        path: '',
        component: ProductsPage
    },
    {
        path: 'add',
        loadChildren: () => import('./add/add.module').then(m => m.AddPageModule)
    },
    {
        path: 'myproducts',
        loadChildren: () => import('./myproducts/myproducts.module').then(m => m.MyproductsPageModule)
    }

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductsPageRoutingModule { }
