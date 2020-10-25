import { NavController } from '@ionic/angular'
import { UtilService } from './util.service'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Injectable } from '@angular/core'
import { map, mergeMap, switchMap } from 'rxjs/operators'
import { combineLatest, of } from 'rxjs'

export interface Customer {
    uid: string,
    user_uid: string,
    shipping_address_uid: string,
    payment_type: string
}

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(
        private afs: AngularFirestore,
        private util: UtilService,
        private navCtrl: NavController
    ) { }

    async saveCustomerData({ uid, detail }, { address, shipping_address }) {
        let addressRef = this.afs.doc(`addresses/${detail.address_id}`)
        let shipping_addressRef = this.afs.doc(`addresses/${detail.shipping_address_id}`)

        await addressRef.set(address, { merge: true })
        await shipping_addressRef.set(shipping_address, { merge: true })
        await this.util.delay()
        await this.util.presentToast('Successfully updated', {
            position: 'top',
            color: 'success'
        })
        this.navCtrl.pop()
    }

    async addCustomerAddress(uid, { address, shipping_address }) {
        let customers = this.afs.collection(`customers`, ref => ref.where('user_uid', '==', uid))
        let addressRef = this.afs.collection(`addresses`)
        let shipping_addressRef = this.afs.collection(`addresses`)

        await addressRef.add(address)
            .then(function (docRef) {
                customers.get()
                    .toPromise()
                    .then(query => {
                        let q = query.docs[0]
                        q.ref.update({ address_id: docRef.id })
                    })
            })
        await shipping_addressRef.add(shipping_address)
            .then(function (docRef) {
                customers.get()
                    .toPromise()
                    .then(query => {
                        let q = query.docs[0]
                        q.ref.update({ shipping_address_id: docRef.id })
                    })
            })
        await this.util.delay()
        await this.util.presentToast('Successfully updated', {
            position: 'top',
            color: 'success'
        })
        this.navCtrl.pop()
    }

    getCustomerDetails$(id) {
        let customers = this.afs.collection(`customers`, ref => ref.where('user_uid', '==', id))
            .valueChanges()
            .pipe(
                map(data => data[0])
            )

        return customers.pipe(
            switchMap((customer: any) => {
                let address, shipping_address
                if (customer) {
                    address = this.afs.doc(`addresses/${customer.address_id}`)
                        .valueChanges()
                    shipping_address = this.afs.doc(`addresses/${customer.shipping_address_id}`)
                        .valueChanges()
                } else {
                    address = of(null)
                    shipping_address = of(null)
                }

                return combineLatest([of(customer), address, shipping_address])
                    .pipe(
                        map(data => {
                            data[0].address = data[1] ? data[1] : null
                            data[0].shipping_address = data[2] ? data[2] : null

                            return data[0]
                        })
                    )
            }),
        )
    }
}
