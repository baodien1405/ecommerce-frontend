import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'

import PageHeader from '@/components/PageHeader'
import Spring from '@/components/Spring'
import { AddEditProductForm } from '@/pages/AddEditProduct/components'
import { useProductDetails } from '@/hooks'
import { ProductPayload } from '@/types'

export default function AddEditProduct() {
  const { productId } = useParams()
  const isAddMode = productId === 'add'

  const { data } = useProductDetails(productId as string)
  const productDetails = data?.data.metadata

  const handleAddEditProduct = (payload: Partial<ProductPayload>) => {
    console.log('🚀 ~ handleAddEditProduct ~ payload:', payload)
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
