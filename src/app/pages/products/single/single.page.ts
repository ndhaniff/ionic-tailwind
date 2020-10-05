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
    @ViewChild('productimg', { static: true }) productImg: ElementRef
    product: any
    thumbOption: SwiperOptions = {
        slidesPerView: 3,
        spaceBetween: 10
    }
    public items: any = [];

    constructor(
        private route: ActivatedRoute
    ) {
    }

    expandItem(item): void {
        if (item.expanded) {
            item.expanded = false
        } else {
            item.expanded = true
        }
    }

    ngOnInit() {
        let id = this.route.snapshot.paramMap.get('id')
        this.product = products.find(product => product.id === parseFloat(id))
        if (this.product) {
            this.product.desc = {
                text: this.product.desc,
                expanded: false
            }
            console.log(this.product)
        }
    }

    selectImage(src) {
        this.productImg.nativeElement.src = src
    }

}
