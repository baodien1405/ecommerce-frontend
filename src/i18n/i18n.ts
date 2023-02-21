import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import LOGIN_EN from '@/locales/en/login.json'
import PRODUCT_LIST_EN from '@/locales/en/productList.json'
import LOGIN_VI from '@/locales/vi/login.json'
import PRODUCT_LIST_VI from '@/locales/vi/productList.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

export const resources = {
  en: {
    login: LOGIN_EN,
    productList: PRODUCT_LIST_EN
  },
  vi: {
    login: LOGIN_VI,
    productList: PRODUCT_LIST_VI
  }
} as const

export const defaultNS = 'login'

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  ns: ['login', 'productList'],
  fallbackLng: 'vi',
  defaultNS,
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})
