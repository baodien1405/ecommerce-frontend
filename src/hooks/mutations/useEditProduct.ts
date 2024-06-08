import { useMutation } from '@tanstack/react-query'

import productApi from '@/api/product.api'
import { MutationKeys } from '@/constants'
import { Product } from '@/types'

export const useEditProduct = () => {
  return useMutation({
    mutationKey: [MutationKeys.EDIT_PRODUCT],
    mutationFn: (body: Partial<Product>) => productApi.updateProduct(String(body?._id), body)
  })
}
