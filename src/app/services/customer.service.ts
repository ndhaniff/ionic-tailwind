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
        let customers = this.afs.collection(`customers`, ref => ref.where('user_uid', '==', uid))
            .valueChanges()
            .pipe(
                map(data => data[0])
            )
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

    getCustomerDetails$(id) {
        let customers = this.afs.collection(`customers`, ref => ref.where('user_uid', '==', id))
            .valueChanges()
            .pipe(
                map(data => data[0])
            )

        return customers.pipe(
            switchMap((customer: any) => {
                let address = this.afs.doc(`addresses/${customer.address_id}`)
                    .valueChanges()
                let shipping_address = this.afs.doc(`addresses/${customer.shipping_address_id}`)
                    .valueChanges()

                return combineLatest([of(customer), address, shipping_address])
                    .pipe(
                        map(data => {
                            data[0].address = data[1]
                            data[0].shipping_address = data[2]

                            return data[0]
                        })
                    )
            }),
        )
    }
}
