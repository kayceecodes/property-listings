/* Product Data For display  */
export interface ProductData {
  name: string
  price: number
  src: string
  category: string
  id?: number
}

/* Items for storing in a cart */
export interface Items {
      name: string
      quantity: number
      size: number
      price: number
      src: string
      id: any
}[]
