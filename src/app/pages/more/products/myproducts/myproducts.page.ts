import { ProductService } from './../../../../services/product.service'
import { Component, OnInit } from '@angular/core'
import FuzzySearch from 'fuzzy-search'
import { AlertController, NavController } from '@ionic/angular'

@Component({
    selector: 'app-myproducts',
    templateUrl: './myproducts.page.html',
    styleUrls: ['./myproducts.page.scss'],
})
export class MyproductsPage implements OnInit {
    searcher
    myproducts
    displayProducts
    keyword = ''
    loaded: boolean = false
    noproduct: boolean = false
    constructor(
        private productsvc: ProductService,
        private alertCtrl: AlertController,
        private navCtrl: NavController
    ) { }

    ngOnInit() {
        let { uid } = JSON.parse(localStorage['user'])
        this.productsvc.getMyProduct(uid)
            .subscribe(data => {
                this.myproducts = this.displayProducts = data
                this.loaded = true
                if (this.myproducts.length === 0) {
                    this.noproduct = true
                }
                this.searcher = new FuzzySearch(this.myproducts, ['name', 'category.name', 'category.subcategory'], {
                    caseSensitive: false,
                })
            })
    }

    search(keyword) {
        console.log(keyword)
        if (keyword === '') {
            this.displayProducts = this.myproducts
        } else {
            this.displayProducts = this.searcher.search(keyword)
        }
    }

    async removeProduct(uid) {
        await this.presentAlertConfirm(uid)
    }

    async presentAlertConfirm(uid) {
        const alert = await this.alertCtrl.create({
            header: 'Delete product',
            message: 'Are you <span class="text-red-600 font-bold">sure</span>?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah')
                    }
                }, {
                    text: 'Destroy',
                    cssClass: 'bg-red-600 text-white',
                    handler: () => this.attemptDelete(uid)
                }
            ]
        })

        await alert.present()
    }

    attemptDelete(uid) {
        this.productsvc.removeProduct(uid)
    }

    goToAddProduct() {
        this.navCtrl.navigateForward('/account/products/add')
    }
}
