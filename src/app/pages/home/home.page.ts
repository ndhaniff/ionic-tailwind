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
    watches: any = []
    trending: any = []
    newArrivals: any = []

    // // replace this
    // get clothing() {
    //     let clothing = this.products.filter(product => product.category.name === 'clothing')
    //     return {
    //         newarrival: clothing.filter(product => product.tag.split(',').includes('newarrival')).slice(0, 4),
    //         trending: clothing.filter(product => product.tag.split(',').includes('trending')).slice(0, 4)
    //     }
    // }

    // // replace this
    // get shoes() {
    //     let shoes = this.products.filter(product => product.category.name === 'shoes')

    //     return {
    //         newarrival: shoes.filter(product => product.tag.split(',').includes('newarrival')).slice(0, 4),
    //         trending: shoes.filter(product => product.tag.split(',').includes('trending')).slice(0, 4)
    //     }
    // }

    // // replace this
    // get bag() {
    //     let bag = this.products.filter(product => product.category.name === 'bag')

    //     return {
    //         newarrival: bag.filter(product => product.tag.split(',').includes('newarrival')).slice(0, 4),
    //         trending: bag.filter(product => product.tag.split(',').includes('trending')).slice(0, 4)
    //     }
    // }

    // // replace this
    // get watches() {
    //     let watches = this.products.filter(product => product.category.name === 'watches')

    //     return {
    //         newarrival: watches.filter(product => product.tag.split(',').includes('newarrival')).slice(0, 4),
    //         trending: watches.filter(product => product.tag.split(',').includes('trending')).slice(0, 4)
    //     }
    // }

    // get trending() {
    //     return this.products.filter(product => product.tag.split(',').includes('trending')).slice(0, 4)
    // }

    // get newArrivals() {
    //     return this.products.filter(product => product.tag.split(',').includes('newarrival')).slice(0, 4)
    // }

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
        this.clothes = this.filterProduct(prod, 'clothes')
        this.shoes = this.filterProduct(prod, 'shoes')
        this.bag = this.filterProduct(prod, 'bag')
        this.watches = this.filterProduct(prod, 'watches')
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
