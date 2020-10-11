import { Review } from './review'
export interface Image {
    src: string
}

export interface Shop {
    name: string,
    avatar: string,
}

export interface Seller {
    name: string,
    shop: Shop,
    datejoin: string,
}

export interface Product {
    id: number,
    sku?: string,
    seller: Seller,
    name: string,
    desc: string,
    images: Image[],
    sale_price: number,
    price: number,
    category: {
        name: string,
        subcategory: string
    },
    tag: string,
    reviews: Review[],
    created_at: string,
}