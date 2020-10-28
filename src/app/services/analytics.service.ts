import { AngularFirestore } from '@angular/fire/firestore'
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class AnalyticsService {

    constructor(
        private afs: AngularFirestore
    ) { }

    async getMyPurchaseCount() {
        let ordersRef = this.afs.collection('orders')
        let userId = JSON.parse(localStorage['user']).uid
        let q = ordersRef.ref.where('user_id', '==', userId)
        let unpaid = await q.where('status', '==', 'unpaid').get()
        let paid = await q.where('status', '==', 'paid').get()
        let shipped = await q.where('status', '==', 'shipped').get()
        let complete = await q.where('status', '==', 'complete').get()

        let unpaidData = unpaid.docs.map(doc => doc.data())
        let paidData = paid.docs.map(doc => doc.data())
        let shippedData = shipped.docs.map(doc => doc.data())
        let completeData = complete.docs.map(doc => doc.data())

        return {
            unpaid: unpaidData.length,
            paid: paidData.length,
            shipped: shippedData.length,
            complete: completeData.length
        }
    }
}
