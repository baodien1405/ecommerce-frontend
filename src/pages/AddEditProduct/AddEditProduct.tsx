import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

import PageHeader from '@/components/PageHeader'
import Spring from '@/components/Spring'
import { AddEditProductForm } from '@/pages/AddEditProduct/components'
import { useProductDetails } from '@/hooks'
import { ErrorResponse, Product, ProductPayload } from '@/types'
import productApi from '@/api/product.api'
import { path } from '@/constants'
import { isAxiosUnprocessableEntityError } from '@/utils'

export default function AddEditProduct() {
  const navigate = useNavigate()
  const { productId } = useParams()
  const isAddMode = productId === 'add'

  const { data } = useProductDetails(productId as string)
  const productDetails = data?.data.metadata

  const addProductMutation = useMutation({
    mutationFn: (body: Partial<Product>) => productApi.addProduct(body)
  })

  const updateProductMutation = useMutation({
    mutationFn: (body: Partial<Product>) => productApi.updateProduct(String(body?._id), body)
  })

  const handleAddEditProduct = (payload: Partial<ProductPayload>) => {
    if (payload._id) {
      updateProductMutation.mutate(payload, {
        onSuccess: async (data) => {
          toast.success(data.data?.message)
          navigate(path.productGrid)
        },
        onError: (error) => {
          if (isAxiosUnprocessableEntityError<ErrorResponse<any>>(error)) {
            toast.error(error.response?.data?.message)
          }
        }
      })
    } else {
      addProductMutation.mutate(payload, {
        onSuccess: async (data) => {
          toast.success(data.data?.message)
          navigate(path.productGrid)
        },
        onError: (error) => {
          if (isAxiosUnprocessableEntityError<ErrorResponse<any>>(error)) {
            toast.error(error.response?.data?.message)
          }
        }
      })
    }
  }

  return (
    <div>
      <Helmet>
        <title>{isAddMode ? 'Add' : 'Edit'} Product | ShopFood</title>
        <meta name='description' content={`${isAddMode ? 'Add' : 'Edit'} Product`} />
      </Helmet>

      <div className='px-[15px] 3xl:px-[26px]'>
        <PageHeader title={`${isAddMode ? 'Add' : 'Edit'} Product`} />

        <Spring type='fade' className='card flex-1 xl:py-10'>
          <h5 className='mb-[15px]'>Product Settings</h5>

          {(isAddMode || Boolean(productDetails)) && (
            <AddEditProductForm initialValues={productDetails} onSubmit={handleAddEditProduct} />
          )}
        </Spring>
      </div>
    </div>
  )
}
