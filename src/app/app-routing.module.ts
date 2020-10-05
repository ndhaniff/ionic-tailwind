import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

const routes: Routes = [
    {
        path: 'tabs',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'products',
        children: [
            {
                path: 'single/:id',
                loadChildren: () => import('./pages/products/single/single.module').then(m => m.SinglePageModule)
            }
        ]
    },

    {
        path: 'login',
        loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule)
    },

    {
        path: 'signup',
        loadChildren: () => import('./pages/auth/signup/signup.module').then(m => m.SignupPageModule)
    },

    {
        path: 'more',
        loadChildren: () => import('./pages/more/more.module').then(m => m.MorePageModule)
    },
    {
        path: 'cart',
        loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartPageModule)
    },
    {
        path: 'account',
        children: [

            {
                path: 'orders',
                loadChildren: () => import('@pages/more/orders/orders.module').then(m => m.OrdersPageModule)
            },
            {
                path: 'sales',
                loadChildren: () => import('@pages/more/sales/sales.module').then(m => m.SalesPageModule)
            },
            {
                path: 'products',
                loadChildren: () => import('@pages/more/products/products.module').then(m => m.ProductsPageModule)
            },
            {
                path: 'profile',
                loadChildren: () => import('@pages/more/profile/profile.module').then(m => m.ProfilePageModule)
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/home',
        // redirectTo: 'products/single/1',
        pathMatch: 'full'
    },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
