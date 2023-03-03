export interface Product {
  _id: string
  name: string
  image: string
  type: string
  price: number
  countInStock: number
  rating: number
  description: string
  discount: number
  quantitySold: number
}

export interface Pagination {
  _limit: number
  _page: number
  _totalRows: string
}

export interface ProductResponse {
  status: string
  message: string
  data: Product[]
  pagination: Pagination
}

export interface FormDataProduct {
  name: string
  type: string
  countInStock: string
  price: string
  description: string
  rating: string
  image: string
}
