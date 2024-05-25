import { Armchair, LaptopMinimal, Shirt } from 'lucide-react'

export const PRODUCT_CATEGORIES = [
  { value: 'all', label: 'All Products' },
  { value: 'electronics', label: 'Electronics', icon: <LaptopMinimal />, color: 'accent' },
  { value: 'clothes', label: 'Clothes', icon: <Shirt />, color: 'header' },
  { value: 'furniture', label: 'Furniture', icon: <Armchair />, color: 'red' }
]
