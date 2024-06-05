import { HttpStatusCode } from '@/constants'
import { ErrorResponse } from '@/types'
import { RcFile } from 'antd/es/upload'
import axios, { AxiosError } from 'axios'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) &&
    error.response?.data?.data?.name === 'EXPIRED_TOKEN'
  )
}

export const getBase64 = (file: File): Promise<string> =>
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

export const convertTitleCase = (title: string) => {
  if (title === '') return ''
  const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1)

  const exceptions = ['a', 'an', 'of', 'and', 'the', 'but', 'or', 'on', 'in', 'with', 'for', 'at']

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ')

  return capitalize(titleCase)
}
