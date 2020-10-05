import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { TabsPage } from './tabs.page'

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
                    }
                ],
            },
            {
                path: 'cart',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('@pages/cart/cart.module').then(m => m.CartPageModule)
                    }
                ],
            },
            {
                path: 'more',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../pages/more/more.module').then(m => m.MorePageModule)
                    }
                ],
            },
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full'
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule { }
