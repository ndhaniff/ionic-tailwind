import { startWith, tap } from 'rxjs/operators'
import { ProductService } from './../../services/product.service'
import { Product } from '../../interfaces/product'
import { Component, OnInit, ViewChild } from '@angular/core'
import { IonSlides, NavController } from '@ionic/angular'
import { SwiperOptions } from 'swiper'
import { Observable, Subject } from 'rxjs'
import { products } from '../../mockdata/products'

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    @ViewChild('catSliderContent', { static: false }) catSliderContent: IonSlides
    slideChange$: Subject<{ index: number }> = new Subject()
    catSliderOpt: SwiperOptions = {
        slidesPerView: 3
    }
    catSliderContentOpt: SwiperOptions = {
        slidesPerView: 1,
        spaceBetween: 10,
        simulateTouch: false
    }
    loading = true
    productSubscription$
    activeSlideIdx = 0

    categories = [
        {
            name: 'All'
        },
        {
            name: 'Clothes'
        },
        {
            name: 'Food'
        },
        {
            name: 'Shoes'
        },
        {
            name: 'Bag'
        },
        {
            name: 'Watches'
        },
    ]

    products: any = []
    clothes: any = []
    shoes: any = []
    bag: any = []
    food: any = []
    watches: any = []
    trending: any = []
    newArrivals: any = []

    constructor(
        private navCtrl: NavController,
        private productSvc: ProductService
    ) { }

    ngOnInit() {

    }

    ionViewDidEnter() {
        this.productSubscription$ = this.productSvc.getProducts()
            .pipe(
                startWith(localStorage['products'] ? JSON.parse(localStorage['products']) : []),
                tap(data => {
                    localStorage['products'] = JSON.stringify(data)
                })
            )
            .subscribe(this.formatProducts.bind(this))
    }

    formatProducts(prod) {
        this.products = prod
        this.clothes = this.filterProduct(prod, 'Clothes')
        this.food = this.filterProduct(prod, 'Food')
        this.shoes = this.filterProduct(prod, 'Shoes')
        this.bag = this.filterProduct(prod, 'Bag')
        this.watches = this.filterProduct(prod, 'Watches')
        this.trending = prod.filter(product => product.tags.split(',').includes('trending')).slice(0, 4)
        this.newArrivals = prod.filter(product => product.tags.split(',').includes('newarrival')).slice(0, 4)
        this.loading = false
    }

    filterProduct(prod, catname) {
        let filtered = prod.filter(product => product.category.name === catname)
        return {
            newarrival: filtered.filter(product => product.tags.split(',').includes('newarrival')).slice(0, 4),
            trending: filtered.filter(product => product.tags.split(',').includes('trending')).slice(0, 4)
        }
    }

    async contentSlideChange() {
        let index = await this.catSliderContent.getActiveIndex()
        this.slideChange$.next({
            index
        })
    }

    async selectCategory(index) {
        this.activeSlideIdx = index
        this.catSliderContent.slideTo(index)
    };

    gotoSearch() {
        this.navCtrl.navigateForward('search', { animated: false })
    }

    goToProduct(uid) {
        this.navCtrl.navigateForward('products/single/' + uid)
    }

    ngOnDestroy() {
        this.productSubscription$.unsubsribe()
    }

}
