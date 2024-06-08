import { useMutation } from '@tanstack/react-query'

import productApi from '@/api/product.api'
import { MutationKeys } from '@/constants'

export const useUnPublishProduct = () => {
  return useMutation({
    mutationKey: [MutationKeys.UN_PUBLISH_PRODUCT],
    mutationFn: productApi.unPublishProduct
  })
}
