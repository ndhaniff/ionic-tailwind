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

    removeProduct(item, single = false) {
        this.cartSvc.removeCartItem(item, single)
    }

    addProduct(item) {
        this.cartSvc.addCartItem(item, true)
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
