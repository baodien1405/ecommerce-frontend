import { SuccessResponse, User } from '@/types'
export interface FormDataLogin {
  email: string
  password: string
}

export interface FormDataRegister {
  name: string
  email: string
  password: string
}

export type AuthResponse = SuccessResponse<{
  shop: User
  accessToken: string
  refreshToken: string
}>
