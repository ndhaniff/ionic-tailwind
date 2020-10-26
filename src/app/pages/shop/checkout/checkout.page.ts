import { OrderService } from './../../../services/order.service'
import { CartService } from './../../../services/cart.service'
import { startWith, tap } from 'rxjs/operators'
import { ProductService } from './../../../services/product.service'
import { CustomerService } from './../../../services/customer.service'
import { Component, OnInit } from '@angular/core'
import { chain } from 'lodash'
import * as moment from 'moment'
import { ActionSheetController, NavController } from '@ionic/angular'

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.page.html',
    styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
    customerSubscription$
    productsSubscription$
    cartSubscription$
    customerDetail
    allproducts
    cartState
    courier = {
        name: 'J&T Express',
        price: 4.66
    }
    order
    user

    constructor(
        private customerSvc: CustomerService,
        private productSvc: ProductService,
        private cartSvc: CartService,
        public actionSheetController: ActionSheetController,
        private orderSvc: OrderService,
        private navCtrl: NavController
    ) { }

    get deliveryDate() {
        return moment().add(3, 'days').format('DD MMM') + '-' + moment().add(5, 'days').format('DD MMM')
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage['user'])
    }

    async presentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Shipping Option',
            cssClass: 'shipping-selector',
            buttons: [{
                text: 'J&T',
                handler: () => {
                    this.courier = {
                        name: 'J&T Express',
                        price: 4.66
                    }
                }
            }, {
                text: 'Poslaju',
                handler: () => {
                    this.courier = {
                        name: 'Poslaju Sdn Bhd',
                        price: 6.50
                    }
                }
            }]
        })
        await actionSheet.present()
    }

    ionViewDidEnter() {
        let user = JSON.parse(localStorage['user'])
        this.getCustomerDetails(user.uid)
        this.productsSubscription$ = this.productSvc.getProducts()
            .pipe(
                startWith(localStorage['products'] ? JSON.parse(localStorage['products']) : []),
                tap(data => {
                    localStorage['products'] = JSON.stringify(data)
                })
            )
            .subscribe(prod => {
                prod = prod.map(p => {
                    p.seller.shop = JSON.parse(p.seller.shop)
                    return p
                })
                this.allproducts = prod
            })
        this.cartSubscription$ = this.cartSvc.state$
            .subscribe(cartState => {
                let cart = cartState.cart.map(p => {
                    return {
                        ...this.allproducts.find(prod => prod.uid === p.uid),
                        count: p.count
                    }
                })
                // group by seller
                cart = chain(cart).groupBy(p => p.seller.shop.name).value()
                this.cartState = {
                    cart: Object.entries(cart),
                    totals: cartState.totals
                }
            })
    }

    getCustomerDetails(uid) {
        this.customerSubscription$ = this.customerSvc.getCustomerDetails$(uid).subscribe(detail => {
            this.customerDetail = detail
        })
    }

    async placeOrder() {
        let promises = this.cartState.cart.map(item => {
            let shopName = item[0]
            let products = item[1]

            products.forEach(async prod => {
                await this.orderSvc.placeOrder({
                    ...prod,
                    seller_id: prod.seller.shop.user_uid,
                    user_id: this.user.uid,
                    status: 'unpaid'
                })
            })
        })

        await Promise.all(promises)
        this.navCtrl.navigateForward('/order/' + this.cartState.uid)
    }

    editAddress() {
        this.navCtrl.navigateForward('/account/profile')
    }

    ngOnDestroy() {
        this.customerSubscription$.unsubscribe()
        this.productsSubscription$.unsubscribe()
        this.cartSubscription$.unsubscribe()
    }

}
