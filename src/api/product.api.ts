import { Product, ProductListResponse, SuccessResponse } from '@/types'
import axiosClient from './axiosClient'

export const URL_PRODUCT = '/product'

const productApi = {
  getProductList(page?: number | string, limit?: number | string, signal?: AbortSignal) {
    return axiosClient.get<ProductListResponse>(URL_PRODUCT, {
      params: {
        _page: page,
        _limit: limit
      },
      signal
    })
  },
  addProduct(product: Omit<Product, '_id' | 'discount' | 'quantitySold'>) {
    return axiosClient.post<SuccessResponse<Product>>(URL_PRODUCT, product)
  },
  getProduct(id: number | string) {
    return axiosClient.get<SuccessResponse<Product>>(`${URL_PRODUCT}/${id}`)
  },
  updateProduct(id: number | string, product: Omit<Product, '_id' | 'discount' | 'quantitySold'>) {
    return axiosClient.put<SuccessResponse<Product>>(`${URL_PRODUCT}/${id}`, product)
  },
  deleteProduct(id: number | string) {
    return axiosClient.delete<Omit<SuccessResponse<any>, 'data'>>(`${URL_PRODUCT}/${id}`)
  }
}

export default productApi
