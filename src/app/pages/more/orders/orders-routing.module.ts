import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { OrdersPage } from './orders.page'

const routes: Routes = [
    {
        path: '',
        component: OrdersPage
    },
    {
        path: 'edit/:id',
        loadChildren: () => import('./edit/edit.module').then(m => m.EditPageModule)
    }

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrdersPageRoutingModule { }
