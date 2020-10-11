import { Product } from 'app/interfaces/product'
import { ProductService } from './../../../../services/product.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core'


@Component({
    selector: 'app-add',
    templateUrl: './add.page.html',
    styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
    uploadedImages = []
    addproductform: FormGroup
    categories
    subcategory

    constructor(
        private fb: FormBuilder,
        public productSvc: ProductService
    ) { }

    get price() {
        return this.addproductform.get('price')
    }

    get category() {
        return this.addproductform.get('category')
    }

    get sub_category() {
        return this.addproductform.get('sub_category')
    }

    get sale_price() {
        return this.addproductform.get('sale_price')
    }

    get desc() {
        return this.addproductform.get('desc')
    }

    get tags() {
        return this.addproductform.get('tags')
    }

    ngOnInit() {
        this.addproductform = this.fb.group({
            price: ['', [
                Validators.required
            ]],
            sale_price: ['', [
                Validators.required
            ]],
            desc: ['', [
                Validators.required
            ]],
            name: ['', [
                Validators.required
            ]],
            sub_category: ['', [
                Validators.required
            ]],
            category: ['', [
                Validators.required
            ]],
            tags: ['', [
                Validators.required
            ]]
        })
        this.productSvc.getCategories()
            .subscribe(data => this.categories = data)
    }

    loadSubcategory(catid) {
        this.productSvc.getSubCategories(catid).subscribe(data => this.subcategory = data)
    }

    async uploadImage(ev) {
        for (let file of ev.target.files) {
            if (this.uploadedImages.length !== 5) {
                let image = await this.toBase64(file)
                this.uploadedImages.push(image)
            }
        }
    }

    toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }

    removeImg(i) {
        this.uploadedImages.splice(i, 1)
    }

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false
        }
        return true

    }

    createProduct() {
        const { sub_category, category, tags, ...rest } = this.addproductform.value
        let seller = JSON.parse(localStorage['seller'])
        let productData: Product = {
            ...rest,
            tags: tags.join(),
            category: {
                name: this.categories.find(c => c.uid = category).name,
                subcategory: this.subcategory.find(c => c.uid = sub_category).name
            },
            images: this.uploadedImages,
            seller,
            reviews: []
        }

        this.productSvc.addProduct(productData)
    }
}
