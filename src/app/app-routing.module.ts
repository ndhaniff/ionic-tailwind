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
            },
            {
                path: 'newarrivals',
                loadChildren: () => import('./pages/products/newarrivals/newarrivals.module').then(m => m.NewarrivalsPageModule)
            },
            {
                path: 'trending',
                loadChildren: () => import('./pages/products/trending/trending.module').then(m => m.TrendingPageModule)
            },
        ]
    },

    {
        path: 'search',
        loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule)
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
        path: 'checkout',
        loadChildren: () => import('./pages/shop/checkout/checkout.module').then(m => m.CheckoutPageModule)
    },

    {
        path: 'order/:id',
        loadChildren: () => import('./pages/shop/order/order.module').then(m => m.OrderPageModule)
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
            },
            {
                path: 'mypurchase/:type',
                loadChildren: () => import('@pages/more/mypurchase/mypurchase.module').then(m => m.MypurchasePageModule)
            },

            {
                path: 'myshop',
                loadChildren: () => import('@pages/more/myshop/myshop.module').then(m => m.MyshopPageModule)
            },
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/home',
        // redirectTo: 'products/single/1',
        pathMatch: 'full'
    },
    {
        path: 'thankyou',
        loadChildren: () => import('./pages/shop/thankyou/thankyou.module').then(m => m.ThankyouPageModule)
    },
    {
        path: 'status',
        loadChildren: () => import('./pages/products/status/status.module').then(m => m.StatusPageModule)
    },
    {
        path: 'review',
        loadChildren: () => import('./pages/products/review/review.module').then(m => m.ReviewPageModule)
    },
    {
        path: 'pay',
        loadChildren: () => import('./pages/products/pay/pay.module').then(m => m.PayPageModule)
    },







]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
