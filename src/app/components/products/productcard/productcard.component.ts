import { NavController } from '@ionic/angular'
import { Product } from './../../../interfaces/Product'
import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'app-productcard',
    templateUrl: './productcard.component.html',
    styleUrls: ['./productcard.component.scss'],
})
export class ProductcardComponent implements OnInit {
    @Input('product') product: Product

    constructor(
        private navCtrl: NavController
    ) { }

    ngOnInit() { }

    goToProduct() {
        this.navCtrl.navigateForward(['products/single', this.product])
    }

}
