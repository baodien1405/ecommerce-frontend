import { Pagination } from './api.type'

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

export interface ProductListConfig {
  _page?: number | string
  _limit?: number | string
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  order?: 'asc' | 'desc'
  exclude?: string
  rating_filter?: number | string
  price_max?: number | string
  price_min?: number | string
  name?: string
  type?: string
  category?: string
}
