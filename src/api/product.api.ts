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
    return axiosClient.put<SuccessResponse<Product>>(`${URL_PRODUCT}/${id}`, product)
  },
  deleteProduct(id: number | string) {
    return axiosClient.delete<Omit<SuccessResponse<any>, 'data'>>(`${URL_PRODUCT}/${id}`)
  },
  deleteManyProducts(productIds: string[]) {
    return axiosClient.delete<Omit<SuccessResponse<any>, 'data'>>(`${URL_PRODUCT}/many`, {
      data: productIds
    })
  },
  getProductTypeList() {
    return axiosClient.get<SuccessResponse<string[]>>(`${URL_PRODUCT}/types`)
  }
}

export default productApi
