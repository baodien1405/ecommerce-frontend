import { ReactNode } from 'react'

export interface CheckboxOption {
  label?: ReactNode
  value: string | number
}

export interface SuccessResponse<Data> {
  status: string
  message: string
  code: number
  metadata: Data
}
export interface ErrorResponse<Data> {
  status: string
  message: string
  data?: Data
}

export interface TokenDecode {
  id: string
  isAdmin: boolean
  exp: number
  iat: number
}

export interface IconProps {
  width?: string
  height?: string
  className?: string
  onClick?: () => void
}

export interface DeleteItemResponse {
  acknowledged: boolean
  deletedCount: number
}
