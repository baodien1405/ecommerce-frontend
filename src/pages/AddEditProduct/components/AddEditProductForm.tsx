import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Button from '@/components/Button'
import { InputField, PhotoField, SelectField, TextAreaField } from '@/components/FormFields'
import { ProductPayload } from '@/types'
import { useProductSchema } from '@/pages/AddEditProduct/hooks'
import { ProductType } from '@/constants'

interface AddEditProductFormProps {
  initialValues?: Partial<ProductPayload>
  onSubmit?: (payload: Partial<ProductPayload>) => void
}

export function AddEditProductForm({ initialValues, onSubmit }: AddEditProductFormProps) {
  const productSchema = useProductSchema(initialValues)

  const { control, watch, handleSubmit } = useForm<ProductPayload>({
    defaultValues: {
      ...initialValues,
      product_thumbnail: initialValues?._id ? { file: null, previewUrl: initialValues.product_thumb } : null
    },
    resolver: yupResolver(productSchema)
  })

  const watchProductType = watch('product_type')

  const handleFormSubmit = (payload: Partial<ProductPayload>) => {
    onSubmit?.(payload)
  }

  return (
    <form
      className='grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,550px)] xl:gap-10'
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div>
        <div className='grid grid-cols-2 gap-5 md:grid-cols-4 2xl:grid-cols-[repeat(5,minmax(0,1fr))]'>
          <div className='col-span-2 grid grid-cols-2 gap-5 2xl:col-span-1 2xl:grid-cols-1'>
            <PhotoField name='product_thumbnail' label='Product Thumbnail' control={control} />
          </div>
        </div>

        <div className='mt-4 flex flex-col gap-4'>
          <TextAreaField
            label='Product Description'
            name='product_description'
            control={control}
            variant='normal'
            placeholder='Enter a product description'
            inputClassName='resize-none h-[160px] py-[15px] overflow-y-auto'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 gap-x-2 gap-y-4'>
        <InputField label='Product Name' name='product_name' control={control} placeholder='Enter a product name' />

        <div className='grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2'>
          <SelectField
            label='Product Type'
            name='product_type'
            control={control}
            placeholder='Select an product type'
            disabled={!!initialValues?._id}
            options={[
              { label: 'Clothing', value: ProductType.CLOTHING },
              { label: 'Electronics', value: ProductType.ELECTRONICS },
              { label: 'Furniture', value: ProductType.FURNITURE }
            ]}
          />

          <SelectField
            label='Product Rating'
            name='product_ratingsAverage'
            control={control}
            placeholder='Select a rating'
            options={[
              { label: '1', value: 1 },
              { label: '1.5', value: 1.5 },
              { label: '2', value: 2 },
              { label: '2.5', value: 2.5 },
              { label: '3', value: 3 },
              { label: '3.5', value: 3.5 },
              { label: '4', value: 4 },
              { label: '4.5', value: 4.5 },
              { label: '5', value: 5 }
            ]}
          />
        </div>

        {['Clothing', 'Furniture'].includes(watchProductType) && (
          <div className='grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]'>
            <InputField label='Brand' name='product_attributes.brand' control={control} placeholder='Enter a brand' />
            <InputField label='Size' name='product_attributes.size' control={control} placeholder='Enter a size' />
            <InputField
              label='Material'
              name='product_attributes.material'
              control={control}
              placeholder='Enter a material'
            />
          </div>
        )}

        {watchProductType === 'Electronics' && (
          <div className='grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]'>
            <InputField
              label='Manufacturer'
              name='product_attributes.manufacturer'
              control={control}
              placeholder='Enter a manufacturer'
            />
            <InputField label='Model' name='product_attributes.model' control={control} placeholder='Enter a model' />
            <InputField label='Color' name='product_attributes.color' control={control} placeholder='Enter a color' />
          </div>
        )}

        <div className='grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2'>
          <InputField label='Product Price' name='product_price' control={control} placeholder='$99.99' />
          <InputField label='Product Quantity' name='product_quantity' control={control} placeholder='0' />
        </div>

        {initialValues?._id ? (
          <Button
            type='submit'
            loading={false}
            disabled={false}
            variant='secondary'
            size='large'
            className='mx-auto mt-4 w-full'
          >
            Update
          </Button>
        ) : (
          <div className='mt-4 grid gap-2 sm:grid-cols-2'>
            <Button loading={false} disabled={false} variant='secondary' size='large' className='mx-auto w-full'>
              Save to Drafts
            </Button>

            <Button loading={false} disabled={false} variant='primary' size='large' className='mx-auto w-full'>
              Publish Product
            </Button>
          </div>
        )}
      </div>
    </form>
  )
}
