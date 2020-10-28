import { ActivatedRoute } from '@angular/router'
import { NavController } from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore'
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-myshop',
    templateUrl: './myshop.page.html',
    styleUrls: ['./myshop.page.scss'],
})
export class MyshopPage implements OnInit {
    products
    myshopproducts
    seller

    constructor(
        private afs: AngularFirestore,
        private navCtrl: NavController,
        private router: ActivatedRoute
    ) { }

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.seller = JSON.parse(localStorage['seller'])
        this.seller.shop = JSON.parse(this.seller.shop)

        this.afs.collection('products')
            .get()
            .toPromise()
            .then(docRef => {
                let products = docRef.docs.map((data: any) => {
                    let productsData = data.data()
                    productsData.uid = data.id
                    productsData.seller.shop = JSON.parse(productsData.seller.shop)
                    return productsData
                })

                this.myshopproducts = products.filter(p => p.seller.shop.user_uid === this.router.snapshot.params.id)
            })
    }

    goToProduct(uid) {
        this.navCtrl.navigateForward('products/single/' + uid)
    }

}
