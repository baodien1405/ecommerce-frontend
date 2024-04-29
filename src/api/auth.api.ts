import { AuthResponse, FormDataLogin, FormDataRegister, SuccessResponse } from '@/types'
import axiosClient, { HEADER } from './axiosClient'

export const URL_REGISTER = '/shop/sign-up'
export const URL_LOGIN = '/shop/login'
export const URL_LOGOUT = '/shop/logout'
export const URL_REFRESH_TOKEN = '/shop/refresh-token'

const authApi = {
  registerAccount(body: FormDataRegister) {
    return axiosClient.post<AuthResponse>(URL_REGISTER, body)
  },
  login(body: FormDataLogin) {
    return axiosClient.post<AuthResponse>(URL_LOGIN, body)
  },
  logout() {
    return axiosClient.post<SuccessResponse<any>>(URL_LOGOUT)
  },
  refreshToken(refreshToken: string) {
    return axiosClient.post<AuthResponse>(
      URL_REFRESH_TOKEN,
      {},
      {
        headers: {
          [HEADER.REFRESH_TOKEN]: refreshToken
        }
      }
    )
  }
}

export default authApi
