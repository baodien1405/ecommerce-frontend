import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'

import PageHeader from '@/components/PageHeader'
import Spring from '@/components/Spring'
import { AddEditProductForm } from '@/pages/AddEditProduct/components'
import { useProductDetails } from '@/hooks'

export default function AddEditProduct() {
  const { productId } = useParams()
  const isAddMode = productId === 'add'

  useProductDetails(productId as string)

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

          <AddEditProductForm />
        </Spring>
      </div>
    </div>
  )
}
