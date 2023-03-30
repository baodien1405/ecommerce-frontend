export interface OrderItem {
  name: string
  amount: number
  image: string
  price: number
  product: string
}

export interface ShippingAddress {
  fullName: string
  address: string
  city: string
  phone: string
}

export interface OrderProduct {
  orderItems: OrderItem[]
  shippingAddress: ShippingAddress
  paymentMethod: string
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
  user: string
  isPaid: boolean
  paidAt: string
  isDelivered: boolean
  deliveredAt: string
  isSuccessOrder: boolean
}
