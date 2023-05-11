import { Product, ProductListConfig, ProductListResponse, SuccessResponse } from '@/types'
import axiosClient from './axiosClient'

export const URL_PRODUCT = '/product'

const productApi = {
  getProductList(params: ProductListConfig, signal?: AbortSignal) {
    return axiosClient.get<ProductListResponse>(URL_PRODUCT, {
      params,
      signal
    })
  },
  addProduct(product: Partial<Product>) {
    return axiosClient.post<SuccessResponse<Product>>(URL_PRODUCT, product)
  },
  getProduct(id: number | string) {
    return axiosClient.get<SuccessResponse<Product>>(`${URL_PRODUCT}/${id}`)
  },
  updateProduct(id: number | string, product: Partial<Product>) {
    return axiosClient.patch<SuccessResponse<Product>>(`${URL_PRODUCT}/${id}`, product)
  },
  deleteProduct(id: number | string) {
    return axiosClient.delete<SuccessResponse<any>>(`${URL_PRODUCT}/${id}`)
  },
  searchProduct(keySearch: string) {
    return axiosClient.get<SuccessResponse<Product[]>>(`${URL_PRODUCT}/search/${keySearch}`)
  },
  deleteManyProducts(productIds: string[]) {
    return axiosClient.delete<SuccessResponse<any>>(`${URL_PRODUCT}/many`, {
      data: productIds
    })
  },
  getDraftProducts(signal?: AbortSignal) {
    return axiosClient.get<SuccessResponse<Product[]>>(`${URL_PRODUCT}/drafts/all`, {
      signal
    })
  },
  getPublishedProducts(signal?: AbortSignal) {
    return axiosClient.get<SuccessResponse<Product[]>>(`${URL_PRODUCT}/published/all`, {
      signal
    })
  },
  publishProduct(productId: string) {
    return axiosClient.post<SuccessResponse<Product>>(`${URL_PRODUCT}/publish/${productId}`)
  },
  unPublishProduct(productId: string) {
    return axiosClient.post<SuccessResponse<Product>>(`${URL_PRODUCT}/unpublish/${productId}`)
  }
}

export default productApi
