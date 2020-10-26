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
        'paid': 'bg-green-400',
        'unpaid': 'bg-yellow-400',
        'complete': 'bg-gray-500'
    }

    constructor(
        private afs: AngularFirestore
    ) { }

    ngOnInit() {
        this.user = JSON.parse(localStorage['user'])
    }

    ionViewDidEnter() {
        this.orderSubscription$ = this.afs.collection('orders', ref => ref.where('seller_id', '==', this.user.uid))
            .valueChanges()
            .subscribe(val => this.orders = val)
    }

}
