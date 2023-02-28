import { AuthResponse, FormDataLogin, FormDataRegister } from '@/types'
import axiosClient from './axiosClient'

export const URL_REGISTER = '/user/sign-up'
export const URL_LOGIN = '/user/sign-in'
export const URL_REFRESH_TOKEN = '/user/refresh-token'

const authApi = {
  registerAccount(body: FormDataRegister) {
    return axiosClient.post<AuthResponse>(URL_REGISTER, body)
  },
  login(body: FormDataLogin) {
    return axiosClient.post<AuthResponse>(URL_LOGIN, body)
  },
  refreshToken() {
    return axiosClient.post<AuthResponse>(URL_REFRESH_TOKEN, {
      withCredentials: true
    })
  }
}

export default authApi
