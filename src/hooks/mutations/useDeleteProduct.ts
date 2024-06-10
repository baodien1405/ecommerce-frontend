import { useMutation } from '@tanstack/react-query'

import productApi from '@/api/product.api'
import { MutationKeys } from '@/constants'

export const useDeleteProduct = () => {
  return useMutation({
    mutationKey: [MutationKeys.DELETE_PRODUCT],
    mutationFn: productApi.deleteProduct
  })
}
