import { SuccessResponse, User } from '@/types'
export interface FormDataLogin {
  email: string
  password: string
}

export interface FormDataRegister {
  email: string
  password: string
  confirmPassword: string
}

export type AuthResponse = SuccessResponse<{
  access_token: string
  refresh_token: string
  user: User
}>

export type RegisterResponse = SuccessResponse<{
  user: User
}>

export type RefreshTokenResponse = SuccessResponse<{
  access_token: string
}>
