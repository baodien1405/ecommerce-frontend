import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'

import productApi from '@/api/product.api'
import { QueryKeys } from '@/constants'
import { Product, SuccessResponse } from '@/types'
import { AxiosResponse } from 'axios'

type UseProductDetailsOptions = Omit<UseQueryOptions, 'queryKey' | 'queryFn'>

export const useProductDetails = (productId: string, options?: UseProductDetailsOptions) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.PRODUCT_DETAILS, productId],
    queryFn: () => productApi.getProduct(productId),
    enabled: !!productId && productId !== 'add'
  }) as UseQueryResult<AxiosResponse<SuccessResponse<Product>>>
}
