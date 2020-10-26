import { CartService } from './../services/cart.service'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.page.html',
    styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
    activeTab: any
    cartCount: any
    $cartSubscription: any
    constructor(
        private router: Router,
        private cartSvc: CartService
    ) { }

    ngOnInit() {

    }

    ionViewDidEnter() {
        this.$cartSubscription = this.cartSvc.state$.subscribe(val => {
            this.cartCount = val.cart.length
        })
    }

    getSelectedTab() {
        this.activeTab = this.router.url
    }

    ngOnDestroy() {
        this.$cartSubscription.unsubsribe()
    }

}
