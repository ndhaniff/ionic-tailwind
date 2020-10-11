import { UtilService } from './util.service'
import { NavController } from '@ionic/angular'
import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { filter, map, mergeMap, switchMap } from 'rxjs/operators'
import { combineLatest, of } from 'rxjs'
import { Product } from 'app/interfaces/product'
import * as moment from 'moment'

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
        private afs: AngularFirestore,
        private util: UtilService,
        private navCtrl: NavController
    ) { }

    getCategories() {
        return this.afs.collection(`categories`).valueChanges({ idField: 'uid' })
    }

    getCategory(name) {
        return this.afs.collection(`categories`, ref => ref.where('name', '==', name))
            .valueChanges({ idField: 'uid' })
            .pipe(
                map(data => data[0]),
            )
    }

    getSubCategories(catid) {
        console.log(`categories/${catid}/subcategories`)
        return this.afs.collection(`categories/${catid}/subcategories`)
            .valueChanges({ idField: 'uid' })
    }

    getMyProduct(uid) {
        return this.afs.collection(`products`)
            .valueChanges({ idField: 'uid' })
            .pipe(
                map((data: any) => {
                    return data.map(d => {
                        d.seller.shop = JSON.parse(d.seller.shop)
                        return d
                    }).filter(d => d.seller.shop.user_uid === uid)
                })
            )
    }

    async removeProduct(uid) {
        await this.afs.doc(`products/${uid}`).delete()
        this.util.presentToast('Product successfully Removed!', {
            position: 'top',
            color: 'danger'
        })
    }

    async addProduct(product) {
        let productToAdd: Product = {
            ...product,
            created_at: moment().format('DD/MM/YYYY')
        }
        await this.afs.collection('products').add(productToAdd)

        this.util.presentToast('Product successfully Added!', {
            position: 'top',
            color: 'success'
        })
        this.navCtrl.navigateForward('/account/products/myproducts')
    }
}