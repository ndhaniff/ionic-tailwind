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
        this.$cartSubscription = this.cartSvc.state$.subscribe(val => {
            let formatted = val.cart.filter((item, i, self) => {
                return i === self.findIndex((it) => {
                    return it.uid === item.uid
                })
            })
            this.cartCount = formatted.length
        })
    }

    getSelectedTab() {
        this.activeTab = this.router.url
    }

}
