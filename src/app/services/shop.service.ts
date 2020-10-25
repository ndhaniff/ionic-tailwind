import { AngularFirestore } from '@angular/fire/firestore'
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class ShopService {

    constructor(
        private afs: AngularFirestore
    ) { }

    getShopByProductId(uid) {
        this.afs.collection()
    }
}
