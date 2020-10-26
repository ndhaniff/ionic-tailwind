import { UtilService } from './util.service'
import { Product } from 'app/interfaces/product'
import { Injectable } from '@angular/core'
import { Observable, of, merge, Subject, BehaviorSubject, combineLatest } from 'rxjs'
import { scan, startWith, map, tap, switchMap, skipWhile, shareReplay, debounceTime, publish, refCount, share } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore'
import { sortBy } from 'lodash'

export interface Totals {
    subTot: number
    grandTot: number
}

export interface CartItem {
    uwid: string,
    image: string,
    price: number,
    name: string,
    remove?: boolean
}

export interface StateTree {
    store: CartItem[]
    cart: CartItem[]
    tot: Totals,
    checkout: boolean
};


@Injectable({
    providedIn: 'root'
})
export class CartService {
    // Main Observables
    private stateTree$ = new BehaviorSubject<StateTree>(null);
    private checkoutTrigger$ = new BehaviorSubject<boolean>(false);
    private cartAdd$ = new Subject<CartItem>();
    private cartRemove$ = new Subject<CartItem>()
    private cartItem: any = []

    constructor(
        private afs: AngularFirestore,
        private util: UtilService
    ) { }

    private get productsInCart(): any {
        let userId = JSON.parse(localStorage['user']).uid
        // get data from firebase
        return this.afs.collection('carts', ref => ref.where('user_id', '==', userId)).valueChanges({ idField: 'cartItemId' })
    }

    async addToCart(product, single = false) {
        let userId = JSON.parse(localStorage['user']).uid
        await this.afs.collection(`carts`).add({
            user_id: userId,
            ...product
        })
        if (!single) {
            await this.util.presentToast('Product added to cart 😊', {
                position: 'top'
            })
        }
    }

    async deleteCartItem(item) {
        await this.afs.collection('carts')
            .ref.where("uid", "==", item.uid)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete().then(() => {
                        console.log("cart items successfully deleted!")
                    }).catch(function (error) {
                        console.error("Error removing document: ", error)
                    })
                })
            })
    }

    async deleteSingleCartItem(item) {
        await this.afs.collection('carts')
            .ref.where("uid", "==", item.uid)
            .get()
            .then(querySnapshot => {
                querySnapshot.docs[0].ref.delete().then(() => {
                    console.log("cart items successfully deleted!")
                }).catch(function (error) {
                    console.error("Error removing document: ", error)
                })
            })
    }

    // cart state
    private get cart$(): any {
        return merge(this.productsInCart, this.cartAdd$, this.cartRemove$).pipe(
            startWith(),
            scan((acc: any, item: any) => {
                if (item) {
                    if (Array.isArray(item)) {
                        return [...acc.filter(i => !Array.isArray(i))]
                    }
                    if (item.count > 1 && item.remove) {
                        let items = acc.filter(i => i.uid === item.uid)
                        items.shift()
                        return [...acc.filter(i => i.uid !== item.uid), ...items]
                    }
                    if (item.removeAll) {
                        return [...acc.filter(i => i.uid !== item.uid)]
                    }
                    return [...acc, item]
                }
            })
        )
    }

    private get total$(): any {
        return this.cart$.pipe(
            map((items: any) => {
                let total = 0
                for (const i of items) {
                    total += i.price
                }
                return total
            }),
            map((cost: any) => ({
                subTot: cost,
                tax: .06 * cost,
                grandTot: .06 * cost + cost
            }))
        )
    }

    state$ = this.stateTree$.pipe(
        switchMap(() => combineLatest([
            this.cart$,
            this.total$
        ])),
        map(([cart, totals]) => ({ cart, totals })),
        map(data => this.formatItem(data))
    )

    formatItem(items) {
        // clone the array
        let cartItem = items.cart.slice(0)
        // remove dupe
        items.cart = items.cart.filter((item, i, self) => {
            return i === self.findIndex((it) => {
                return it.uid === item.uid
            })
        })

        // set count on each dupe
        items.cart = sortBy(items.cart.map(item => {
            let count = cartItem.filter(it => it.uid === item.uid).length
            return {
                ...item,
                count,
                totalPrice: item.price * count
            }
        }), item => item.name)
        return items
    }

    // facade for next of cartAdd subject
    addCartItem(item, single = false) {
        this.cartAdd$.next({ ...item, remove: false })
        return this.addToCart({ ...item, remove: false }, single)
    }
    // facade for next of cartRemove subject
    removeCartItem(item, single = false) {
        if (single) {
            this.cartRemove$.next({ ...item, remove: true })
            return this.deleteSingleCartItem(item)
        } else {
            this.cartRemove$.next({ ...item, removeAll: true })
            return this.deleteCartItem(item)
        }
    }
}
