import { AngularFirestore } from '@angular/fire/firestore'
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(
        private afs: AngularFirestore
    ) { }

    async placeOrder(order) {
        await this.afs.collection('orders').add(order)
    }
}
