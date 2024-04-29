import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import jwtDecode from 'jwt-decode'

import { HttpStatusCode } from '@/constants'
import { AuthResponse, ErrorResponse, User } from '@/types'
import {
  clearLS,
  getAccessTokenFromLS,
  getProfileFromLS,
  getRefreshTokenFromLS,
  isAxiosUnauthorizedError,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from '@/utils'
import authApi, { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from './auth.api'

export const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  REFRESH_TOKEN: 'x-rtoken-id'
}

let accessToken = getAccessTokenFromLS()
let refreshToken = getRefreshTokenFromLS()
let refreshTokenRequest: Promise<string> | null = null
let profile = getProfileFromLS() as User | null

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor
axiosClient.interceptors.request.use(
  async function (config) {
    if (config.headers) {
      config.headers[HEADER.API_KEY] = import.meta.env.VITE_API_KEY
      config.headers[HEADER.CLIENT_ID] = profile?._id
    }
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`
      return config
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const { url } = response.config
    if ([URL_LOGIN, URL_REGISTER].includes(url as string)) {
      const data = response.data as AuthResponse
      profile = data.metadata.shop
      accessToken = data.metadata.accessToken
      refreshToken = data.metadata.refreshToken
      setAccessTokenToLS(accessToken)
      setRefreshTokenToLS(refreshToken)
      setProfileToLS(profile)
    } else if (url === URL_LOGOUT) {
      accessToken = ''
      refreshToken = ''
      clearLS()
    }
    return response
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // Only toast message if error not 422 and 401
    if (![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any | undefined = error.response?.data
      const message = data?.message || error.message
      toast.error(message)
    }

    // Lỗi Unauthorized (401) có rất nhiều trường hợp
    // - Token không đúng
    // - Không truyền token
    // - Token hết hạn*

    // Nếu là lỗi 401
    if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
      const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
      const { url } = config
      const decoded = jwtDecode(accessToken) as { exp: number }
      const isExpiredToken = decoded?.exp < new Date().getTime() / 1000
      // Trường hợp Token hết hạn và request đó không phải là của request refresh token
      // thì chúng ta mới tiến hành gọi refresh token
      if (isExpiredToken && url !== URL_REFRESH_TOKEN) {
        // Hạn chế gọi 2 lần handleRefreshToken
        refreshTokenRequest = refreshTokenRequest
          ? refreshTokenRequest
          : handleRefreshToken().finally(() => {
              // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
              setTimeout(() => {
                refreshTokenRequest = null
              }, 10000)
            })
        return refreshTokenRequest.then((accessToken) => {
          return axiosClient({
            ...config,
            headers: { ...config.headers, Authorization: accessToken }
          })
        })
      }

      // Còn những trường hợp như token không đúng
      // không truyền token,
      // token hết hạn nhưng gọi refresh token bị fail
      // thì tiến hành xóa local storage và toast message

      clearLS()
      accessToken = ''
      refreshToken = ''
      toast.error(error.response?.data.data?.message || error.response?.data.message)
    }

    return Promise.reject(error)
  }
)

async function handleRefreshToken() {
  try {
    const res = await authApi.refreshToken(refreshToken)
    const newAccessToken = res.data.metadata.accessToken
    const newRefetchToken = res.data.metadata.refreshToken

    setAccessTokenToLS(newAccessToken)
    setRefreshTokenToLS(newRefetchToken)

    accessToken = newAccessToken
    refreshToken = newRefetchToken

    return newAccessToken
  } catch (error) {
    clearLS()
    accessToken = ''
    refreshToken = ''
    throw error
  }
}

export default axiosClient
