import { Pagination } from './api.type'

type Clothing = {
  brand: string
  size: string
  material: string
}

type Furniture = {
  brand: string
  size: string
  material: string
}

type Electronics = {
  manufacturer: string
  model: string
  color: string
}

export interface Product {
  _id: string
  product_name: string
  product_thumb: string
  product_description: string
  product_slug: string
  product_variations: Array<any>
  product_price: number
  product_quantity: number
  product_type: string
  product_ratingsAverage: number
  product_attributes: Clothing & Furniture & Electronics
}

export interface ProductListResponse {
  status: string
  message: string
  metadata: {
    items: Product[]
    pagination: Pagination
  }
}

export interface FormDataProduct {
  name: string
  type: string
  quantity: number
  price: number
  description: string
  image: any
  brand?: string
  size?: string
  material?: string
  manufacturer?: string
  model?: string
  color?: string
}

export interface FormDataAction {
  action: string
}

export interface ProductListConfig {
  page?: number | string
  limit?: number | string
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
