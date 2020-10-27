import { CartService } from './../../../services/cart.service'
import { ProductService } from './../../../services/product.service'
import { SwiperOptions } from 'swiper'
import { products } from './../../../mockdata/products'
import { ActivatedRoute } from '@angular/router'
import { Product } from './../../../interfaces/product'
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'

@Component({
    selector: 'app-single',
    templateUrl: './single.page.html',
    styleUrls: ['./single.page.scss'],
})
export class SinglePage implements OnInit {
    productimg: ElementRef
    uid: string
    product: any
    thumbOption: SwiperOptions = {
        slidesPerView: 3,
        spaceBetween: 10
    }
    load: boolean = false
    public items: any = [];
    productSubscription$

    constructor(
        private route: ActivatedRoute,
        private productSvc: ProductService,
        private cartSvc: CartService
    ) {
    }

    @ViewChild('productimg', { static: false }) set productImg(productImg: ElementRef) {
        if (productImg) { // initially setter gets called with undefined
            this.productimg = productImg
        }
    }

    expandItem(item): void {
        if (item.expanded) {
            item.expanded = false
        } else {
            item.expanded = true
        }
    }

    ngOnInit() {
        this.uid = this.route.snapshot.paramMap.get('id')
        this.productSubscription$ = this.productSvc.getProduct(this.uid).subscribe(this.setProduct.bind(this))
    }

    setProduct(prod) {
        this.product = prod
        this.product.desc = {
            text: this.product.desc,
            expanded: false
        }
        this.product.seller.shop = JSON.parse(this.product.seller.shop)
    }

    async addToCart() {
        this.load = true
        await this.cartSvc.addCartItem({
            uid: this.uid,
            image: this.product.images[0],
            name: this.product.name,
            price: this.product.sale_price
        })
        this.load = false
    }

    selectImage(src) {
        this.productimg.nativeElement.src = src
    }

    ngOnDestroy() {
        this.productSubscription$.unsubscribe()
    }
}
