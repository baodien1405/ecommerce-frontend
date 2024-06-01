import { Helmet } from 'react-helmet-async'

import PageHeader from '@/components/PageHeader'
import Spring from '@/components/Spring'
import { AddEditProductForm } from '@/pages/AddEditProduct/components'

export default function AddEditProduct() {
  return (
    <div>
      <Helmet>
        <title>Products | ShopFood</title>
        <meta name='description' content='Products' />
      </Helmet>

      <div className='px-[15px] 3xl:px-[26px]'>
        <PageHeader title='Add Edit Product' />

        <Spring type='fade' className='card flex-1 xl:py-10'>
          <h5 className='mb-[15px]'>Product Settings</h5>

          <AddEditProductForm />
        </Spring>
      </div>
    </div>
  )
}
