import { Image } from './product'
import { User } from './user'

export interface Review {
    user: User,
    message: string,
    rating: number,
    product_id: number,
    images: Image[] | []
    created_at: string,
    updated_at: string
}