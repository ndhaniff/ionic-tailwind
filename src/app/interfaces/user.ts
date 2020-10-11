export interface User {
    uid: string,
    name?: string,
    email: string,
    password?: string,
    avatarUrl?: string,
    is_seller?: boolean,
}