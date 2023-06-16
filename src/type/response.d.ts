export interface IProductItem {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
}

export interface ISingleResponse {

}
export interface IArrayParinatedResponse {
    products: IProductItem[]
    total: number
    skip: number
    limit: number
}