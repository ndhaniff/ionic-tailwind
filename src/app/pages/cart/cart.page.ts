import { NavController } from '@ionic/angular'
import { CartService } from './../../services/cart.service'
import { Component, OnInit } from '@angular/core'
import { map } from 'rxjs/operators'

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
    cartSubscription$
    cartItems
    loading = false

    constructor(
        private cartSvc: CartService,
        private navCtrl: NavController
    ) { }

    ionViewDidEnter() {
        this.cartSubscription$ = this.cartSvc.state$
            .subscribe(cartItems => {
                this.cartItems = cartItems
            })
    }

    ngOnInit() {

    }

    async removeProduct(item, single = false) {
        this.loading = true
        await this.cartSvc.removeCartItem(item, single)
        this.loading = false
    }

    async addProduct(item) {
        this.loading = true
        await this.cartSvc.addCartItem(item, true)
        this.loading = false
    }

    goToProduct(uid) {
        this.navCtrl.navigateForward('products/single/' + uid)
    }

    goToCheckout() {
        this.navCtrl.navigateForward('checkout')
    }

    ngOnDestroy() {
        this.cartSubscription$.unsubscribe()
    }

}
