import { NavController } from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore'
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-orders',
    templateUrl: './orders.page.html',
    styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
    orderSubscription$
    user
    orders
    status = {
        'paid': 'bg-blue-400',
        'unpaid': 'bg-yellow-400',
        'complete': 'bg-green-500',
        'shipped': 'bg-orange-500',
        'cancel': 'bg-red-600',
        'done': 'bg-teal-600',
    }

    constructor(
        private afs: AngularFirestore,
        private navCtrl: NavController
    ) { }

    ngOnInit() {
        this.user = JSON.parse(localStorage['user'])
    }

    ionViewDidEnter() {
        this.orderSubscription$ = this.afs.collection('orders', ref => ref.where('seller_id', '==', this.user.uid))
            .valueChanges({ idField: 'order_id' })
            .subscribe(val => this.orders = val)
    }

    edit(uid) {
        this.navCtrl.navigateForward('/account/orders/edit/' + uid)
    }

}
