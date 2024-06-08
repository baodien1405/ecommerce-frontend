import { useMutation } from '@tanstack/react-query'

import productApi from '@/api/product.api'
import { MutationKeys } from '@/constants'

export const useAddProduct = () => {
  return useMutation({
    mutationKey: [MutationKeys.ADD_PRODUCT],
    mutationFn: productApi.addProduct
  })
}
