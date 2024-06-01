import { useForm } from 'react-hook-form'

import Button from '@/components/Button'
import { InputField, PhotoField, SelectField, TextAreaField } from '@/components/FormFields'

interface AddEditProductFormProps {
  initialValues?: any
}

const PROMOTIONAL_OPTIONS = [
  { value: 'category-1', label: 'Category 1' },
  { value: 'category-2', label: 'Category 2' },
  { value: 'category-3', label: 'Category 3' },
  { value: 'category-4', label: 'Category 4' },
  { value: 'category-5', label: 'Category 5' }
]

const PRODUCT_TYPE_OPTIONS = [
  { value: 'simple', label: 'Simple Product' },
  { value: 'variable', label: 'Variable Product' },
  { value: 'grouped', label: 'Grouped Product' },
  { value: 'service', label: 'Services Product' }
]

const STOCK_STATUS_OPTIONS = [
  { value: 'in-stock', label: 'In Stock' },
  { value: 'low-inventory', label: 'Low Inventory' },
  { value: 'out-of-stock', label: 'Out of Stock' },
  { value: 'on-demand', label: 'On Demand' },
  { value: 'unavailable', label: 'Temporarily Unavailable' }
]

const UNITS_OPTIONS = [
  { value: 'pcs', label: 'Pieces' },
  { value: 'box', label: 'Boxes' },
  { value: 'kg', label: 'Kilograms' }
]

export function AddEditProductForm({ initialValues }: AddEditProductFormProps) {
  const { control, handleSubmit, register, watch } = useForm<any>({
    defaultValues: {
      ...initialValues
    }
  })

  return (
    <form className='grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,550px)] xl:gap-10'>
      <div>
        <div className='grid grid-cols-2 gap-5 md:grid-cols-4 2xl:grid-cols-[repeat(5,minmax(0,1fr))]'>
          <div className='col-span-2 grid grid-cols-2 gap-5 2xl:col-span-1 2xl:grid-cols-1'>
            <PhotoField name='thumbnail' label='Product Thumbnail' control={control} />
          </div>
        </div>

        <div className='mt-4 flex flex-col gap-4'>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,205px)]'>
            <SelectField
              label='Attributes'
              name='productType'
              control={control}
              placeholder='Select an attribute'
              options={[
                { label: 'Clothes', value: 'clothes' },
                { label: 'Electronics', value: 'electronics' },
                { label: 'Furniture', value: 'furniture' }
              ]}
            />

            <InputField
              label='L * W * H, inches'
              name='dimensions'
              control={control}
              placeholder='Product dimensions'
            />

            <InputField label='Weight, kg' name='weight' control={control} placeholder='Product weight' />
          </div>

          <TextAreaField
            label='Description'
            name='description'
            control={control}
            variant='normal'
            placeholder='Product description'
            className='mb-5'
            inputClassName='resize-none h-[160px] py-[15px] overflow-y-auto'
          />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-x-2 gap-y-4'>
        <InputField label='Product Name' name='productName' control={control} placeholder='Enter product name' />

        <div className='grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2'>
          <InputField label='Brand Name' name='brandName' control={control} placeholder='Enter brand name' />

          <SelectField
            label='Category'
            name='category'
            control={control}
            placeholder='Select category'
            options={[
              { label: 'Clothes', value: 'clothes' },
              { label: 'Electronics', value: 'electronics' },
              { label: 'Furniture', value: 'furniture' }
            ]}
          />
        </div>

        <div className='grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2'>
          <InputField label='Regular Price' name='regularPrice' control={control} placeholder='$99.99' />

          <InputField label='Sale Price' name='salePrice' control={control} placeholder='$99.99' />
        </div>

        <div className='grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2'>
          <InputField label='Schedule' name='productSchedule' control={control} placeholder='' />

          <SelectField
            label='Promotion'
            name='promoType'
            control={control}
            placeholder='Select promotion'
            options={PROMOTIONAL_OPTIONS}
          />
        </div>

        <div className='grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2'>
          <SelectField
            label='Product Type'
            name='productType'
            control={control}
            placeholder='Select product type'
            options={PRODUCT_TYPE_OPTIONS}
          />

          <SelectField
            label='Stock Status'
            name='stockStatus'
            placeholder='Select stock status'
            control={control}
            options={STOCK_STATUS_OPTIONS}
          />
        </div>

        <InputField label='SKU' name='productSKU' control={control} placeholder='SKU' />

        <div className='grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2'>
          <SelectField
            label='Stock Status'
            name='stockStatus'
            control={control}
            placeholder='Select stock status'
            options={STOCK_STATUS_OPTIONS}
          />

          <div className='grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-[minmax(0,1fr)_,minmax(0,112px)]'>
            <InputField label='Quantity in Stock' name='qty' control={control} placeholder='0' />

            <SelectField label='Unit' name='unit' control={control} placeholder='Pieces' options={UNITS_OPTIONS} />
          </div>
        </div>

        <div className='mt-4 grid gap-2 sm:grid-cols-2'>
          <Button loading={false} disabled={false} variant='secondary' size='large' className='mx-auto w-full'>
            Save to Drafts
          </Button>

          <Button loading={false} disabled={false} variant='primary' size='large' className='mx-auto w-full'>
            Publish Product
          </Button>
        </div>
      </div>
    </form>
  )
}
