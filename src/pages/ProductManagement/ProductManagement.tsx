import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { CirclePlus, Download } from 'lucide-react'

import Button from '@/components/Button'
import PageHeader from '@/components/PageHeader'
import Search from '@/components/Search'
import { FilterItem } from '@/pages/ProductManagement/components'

export const PRODUCT_MANAGEMENT_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'publish', label: 'Published' },
  { value: 'draft', label: 'Drafts' },
  { value: 'trash', label: 'Trash' }
]

export default function ProductManagement() {
  const navigate = useNavigate()

  const handleOptionChange = () => {}

  return (
    <div>
      <Helmet>
        <title>Products Management | ShopFood</title>
        <meta name='description' content='Products' />
      </Helmet>

      <div className='px-[15px] 3xl:px-[26px]'>
        <PageHeader title='Products Management' />

        <div className='mb-5 flex flex-col-reverse gap-4 md:flex-col lg:flex-row lg:justify-between'>
          <div className='flex flex-col gap-4 md:flex-row md:gap-[14px]'>
            <Button
              type='button'
              loading={false}
              disabled={false}
              variant='primary'
              size='large'
              onClick={() => navigate('/add-edit-product/add')}
            >
              <span className='mr-1'>Add Product</span>
              <CirclePlus size={16} />
            </Button>

            <Button type='button' loading={false} disabled={false} variant='outline' outlineColor='blue' size='large'>
              <span className='mr-1'>Export CSV</span>
              <Download size={16} />
            </Button>
          </div>

          <Search wrapperClass='lg:w-[326px]' placeholder='Search Product' />
        </div>

        <div className='mb-4 flex flex-wrap gap-2'>
          <span className='text-header'>Products:</span>
          <div>
            {PRODUCT_MANAGEMENT_OPTIONS.map((option, index) => (
              <FilterItem
                key={`filter-${index}`}
                text={option.label}
                qty={0}
                value={option.value}
                active={''}
                onClick={handleOptionChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
