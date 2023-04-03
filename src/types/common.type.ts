import { ReactNode } from 'react'

export interface CheckboxOption {
  label?: ReactNode
  value: string | number
}

export interface SuccessResponse<Data> {
  status: string
  message: string
  data: Data
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
