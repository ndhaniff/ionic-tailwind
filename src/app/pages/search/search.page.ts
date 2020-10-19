import { startWith, tap } from 'rxjs/operators'
import { EventsService } from './../../services/events.service'
import FuzzySearch from 'fuzzy-search'
import { ProductService } from './../../services/product.service'
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { MenuController, NavController } from '@ionic/angular'

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
    productSubscription$
    eventSubscription$
    products: any
    searcher: any
    result: any
    keyword: any
    loading: boolean = true
    filter: {
        price: ''
    }
    @ViewChild('pricefilter', { static: false }) pricefilter: ElementRef

    constructor(
        private productSvc: ProductService,
        private menuCtrl: MenuController,
        private eventSvc: EventsService,
        private navCtrl: NavController
    ) { }

    ngOnInit() {
        this.productSubscription$ = this.productSvc.getProducts()
            .pipe(
                startWith(localStorage['products'] ? JSON.parse(localStorage['products']) : []),
                tap(data => {
                    localStorage['products'] = JSON.stringify(data)
                })
            )
            .subscribe(products => {
                this.products = this.result = products
                this.searcher = new FuzzySearch(this.products, ['name', 'category.name', 'category.subcategory'], {
                    caseSensitive: false,
                })
                this.loading = false
            })
        this.eventSubscription$ = this.eventSvc.item.subscribe(ev => {
            if (ev && ev.eventName == 'filterproduct') {
                this.filterProduct(ev.payload)
            }
        })
    }

    ngOnDestroy() {
        this.productSubscription$.unsubscribe()
        this.eventSubscription$.unsubscribe()
    }

    search(keyword) {
        this.loading = true
        console.log(keyword)
        if (keyword === '') {
            this.loading = false
            this.result = this.products
        } else {
            setTimeout(_ => {
                this.result = this.searcher.search(keyword)
                this.loading = false
            }, 500)
        }
    }

    filterProduct({ price, category }) {
        console.log(price, category)
        this.loading = true
        this.result = this.products.filter(prod =>
            (price.upper === 0 && price.lower === 0 ? true : prod.price >= price.lower && prod.price <= price.upper)
            && (category === 'all' ? true : prod.category.name == category)
        )

        setTimeout(_ => this.loading = false, 500)
    }

    goBack() {
        this.navCtrl.pop()
    }

    goToProduct(uid) {
        this.navCtrl.navigateForward('products/single/' + uid)
    }

    openFilterMenu() {
        this.menuCtrl.enable(true, 'first')
        this.menuCtrl.open('filtermenu')
    }
}
