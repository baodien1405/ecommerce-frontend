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
  _totalRows: number
}

export interface ProductListResponse {
  status: string
  message: string
  data: Product[]
  pagination: Pagination
}

export interface FormDataProduct {
  name: string
  type: string
  countInStock: number
  price: number
  description: string
  rating: number
  image: string
}

export interface FormDataAction {
  action: string
}
