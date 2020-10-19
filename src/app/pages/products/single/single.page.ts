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
    product: any
    thumbOption: SwiperOptions = {
        slidesPerView: 3,
        spaceBetween: 10
    }
    public items: any = [];

    constructor(
        private route: ActivatedRoute,
        private productSvc: ProductService
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
        let uid = this.route.snapshot.paramMap.get('id')
        this.productSvc.getProduct(uid).subscribe(this.setProduct.bind(this))
    }

    setProduct(prod) {
        this.product = prod
        this.product.desc = {
            text: this.product.desc,
            expanded: false
        }
        this.product.seller.shop = JSON.parse(this.product.seller.shop)
    }

    selectImage(src) {
        this.productimg.nativeElement.src = src
    }

}
