import { HttpStatusCode } from '@/constants'
import { RcFile } from 'antd/es/upload'
import axios, { AxiosError } from 'axios'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export const formatAmount = (amount: number, locales = 'en-US', currency = 'USD', maximumFractionDigits = 2) => {
  return new Intl.NumberFormat(locales, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: maximumFractionDigits
  }).format(amount)
}
