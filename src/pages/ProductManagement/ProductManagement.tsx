import PageHeader from '@/components/PageHeader'
import { Helmet } from 'react-helmet-async'

export default function ProductManagement() {
  return (
    <div>
      <Helmet>
        <title>Products Management | ShopFood</title>
        <meta name='description' content='Products' />
      </Helmet>

      <div className='px-[15px] 3xl:px-[26px]'>
        <PageHeader title='Products Management' />
      </div>
    </div>
  )
}
