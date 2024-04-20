import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import LOGIN_EN from '@/locales/en/login.json'
import PRODUCT_LIST_EN from '@/locales/en/productList.json'
import LOGIN_VI from '@/locales/vi/login.json'
import PRODUCT_LIST_VI from '@/locales/vi/productList.json'
import REGISTER_EN from '@/locales/en/register.json'
import REGISTER_VI from '@/locales/vi/register.json'
import PROFILE_EN from '@/locales/en/profile.json'
import PROFILE_VI from '@/locales/vi/profile.json'
import HEADER_EN from '@/locales/en/header.json'
import HEADER_VI from '@/locales/vi/header.json'
import LAYOUT_EN from '@/locales/en/layout.json'
import LAYOUT_VI from '@/locales/vi/layout.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

export const resources = {
  en: {
    login: LOGIN_EN,
    productList: PRODUCT_LIST_EN,
    register: REGISTER_EN,
    profile: PROFILE_EN,
    header: HEADER_EN,
    layout: LAYOUT_EN
  },
  vi: {
    login: LOGIN_VI,
    productList: PRODUCT_LIST_VI,
    register: REGISTER_VI,
    profile: PROFILE_VI,
    header: HEADER_VI,
    layout: LAYOUT_VI
  }
} as const

export const defaultNS = 'productList'

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
