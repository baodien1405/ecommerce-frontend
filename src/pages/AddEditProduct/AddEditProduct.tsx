import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import PageHeader from '@/components/PageHeader'
import Spring from '@/components/Spring'
import { path } from '@/constants'
import { useAddProduct, useEditProduct, useProductDetails } from '@/hooks'
import { AddEditProductForm } from '@/pages/AddEditProduct/components'
import { ErrorResponse, ProductPayload } from '@/types'
import { isAxiosUnprocessableEntityError } from '@/utils'

export default function AddEditProduct() {
  const navigate = useNavigate()
  const { productId } = useParams()
  const isAddMode = productId === 'add'

  const { data } = useProductDetails(productId as string)
  const productDetails = data?.data.metadata

  const addProductMutation = useAddProduct()
  const updateProductMutation = useEditProduct()

  const handleAddEditProduct = (payload: Partial<ProductPayload>) => {
    try {
      if (payload._id) {
        updateProductMutation.mutate(payload, {
          onSuccess: (data) => {
            toast.success(data.data?.message)
          }
        })
      } else {
        addProductMutation.mutate(payload, {
          onSuccess: (data) => {
            toast.success(data.data?.message)
          }
        })
      }

      navigate(path.productGrid)
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<any>>(error)) {
        toast.error(error.response?.data?.message)
      }
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
            <AddEditProductForm
              loading={addProductMutation.isPending || updateProductMutation.isPending}
              initialValues={productDetails}
              onSubmit={handleAddEditProduct}
            />
          )}
        </Spring>
      </div>
    </div>
  )
}
