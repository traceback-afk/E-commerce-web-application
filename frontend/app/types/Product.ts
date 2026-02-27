export type ProductImage = {
  id: number
  image: string
}

export type Product = {
  id: number
  name: string
  created_at: string
  category: string
  old_price: string
  new_price: string
  images: ProductImage[]
  description: string
  is_in_stock: boolean
  score: number
}
