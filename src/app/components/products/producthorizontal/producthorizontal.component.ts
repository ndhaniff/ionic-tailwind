import { Product } from './../../../interfaces/product'
import { Component, OnInit, Input } from '@angular/core'

@Component({
    selector: 'app-producthorizontal',
    templateUrl: './producthorizontal.component.html',
    styleUrls: ['./producthorizontal.component.scss'],
})
export class ProducthorizontalComponent implements OnInit {

    @Input('product') product: Product

    constructor() { }

    ngOnInit() { }

}
