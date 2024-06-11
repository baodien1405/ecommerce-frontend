import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import productApi from '@/api/product.api'
import { QueryKeys } from '@/constants'
import { ProductListConfig, ProductListResponse } from '@/types'

type UseProductListOptions = Omit<UseQueryOptions, 'queryKey' | 'queryFn'>

export const useProductList = (params: ProductListConfig, options?: UseProductListOptions) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.PRODUCT_LIST, params],
    queryFn: () => {
      const controller = new AbortController()

      setTimeout(() => {
        controller.abort()
      }, 10000)

      return productApi.getProductList(params as ProductListConfig, controller.signal)
    }
  }) as UseQueryResult<AxiosResponse<ProductListResponse>>
}
