import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { FileInputField, InputFieldVer2, SelectField, TextAreaField } from '@/components/FormFields'
import { useProductFormSchema } from '@/hooks'
import { FormDataProduct } from '@/types'
import Button from '@/components/Button'
import { getBase64 } from '@/utils'
import { ACCEPT_FILE_TYPES, MAX_SIZE_UPLOAD } from '@/constants'

export interface ProductFormProps {
  type?: 'add' | 'update'
  loading?: boolean
  isSuccess?: boolean
  initialValues?: FormDataProduct
  onSubmit?: (formValues: FormDataProduct) => void
}

export function ProductForm({ type = 'add', loading, initialValues, isSuccess, onSubmit }: ProductFormProps) {
  const schema = useProductFormSchema()

  const { control, handleSubmit, register, watch, setValue, reset } = useForm<FormDataProduct>({
    defaultValues: initialValues,
    resolver: yupResolver(schema)
  })

  const watchProductType = useWatch({ control, name: 'type' })

  useEffect(() => {
    if (initialValues) {
      Object.entries(initialValues).map(([key, val]) => setValue(key as keyof FormDataProduct, String(val)))
    }
  }, [initialValues, setValue])

  useEffect(() => {
    if (isSuccess) {
      reset()
    }
  }, [isSuccess, reset])

  const handleProductSubmit = async (formValues: FormDataProduct) => {
    formValues.image = await getBase64(formValues.image[0])
    await onSubmit?.(formValues)
  }

  return (
    <form onSubmit={handleSubmit(handleProductSubmit)}>
      <FileInputField
        label='Image'
        name='image'
        control={control}
        accept='.png,.jpeg,.pdf,.webp'
        acceptFileTypes={ACCEPT_FILE_TYPES}
        maxSize={MAX_SIZE_UPLOAD}
        register={register}
        watch={watch}
        className='mb-5'
      />

      <InputFieldVer2
        label='Name'
        name='name'
        control={control}
        placeholder='Name...'
        variant='outline'
        className='mb-5'
      />

      <SelectField
        label='Product Type'
        name='type'
        control={control}
        placeholder='-- Select one --'
        className='mb-5'
        options={[
          { label: 'Clothing', value: 'Clothing' },
          { label: 'Electronics', value: 'Electronics' },
          { label: 'Furniture', value: 'Furniture' }
        ]}
      />

      {['Clothing', 'Furniture'].includes(watchProductType) && (
        <>
          <InputFieldVer2
            label='Brand'
            name='brand'
            control={control}
            placeholder=''
            variant='outline'
            className='mb-5'
          />
          <InputFieldVer2
            label='Size'
            name='size'
            control={control}
            placeholder=''
            variant='outline'
            className='mb-5'
          />
          <InputFieldVer2
            label='Material'
            name='material'
            control={control}
            placeholder=''
            variant='outline'
            className='mb-5'
          />
        </>
      )}

      {watchProductType === 'Electronics' && (
        <>
          <InputFieldVer2
            label='Manufacturer'
            name='manufacturer'
            control={control}
            placeholder=''
            variant='outline'
            className='mb-5'
          />
          <InputFieldVer2
            label='Model'
            name='model'
            control={control}
            placeholder=''
            variant='outline'
            className='mb-5'
          />
          <InputFieldVer2
            label='Color'
            name='color'
            control={control}
            placeholder=''
            variant='outline'
            className='mb-5'
          />
        </>
      )}

      <InputFieldVer2
        label='Quantity'
        name='quantity'
        control={control}
        type='number'
        placeholder='0'
        variant='outline'
        className='mb-5'
      />

      <InputFieldVer2
        label='Price'
        name='price'
        control={control}
        placeholder='0'
        variant='outline'
        type='number'
        className='mb-5'
      />

      <TextAreaField
        label='Description'
        name='description'
        control={control}
        variant='outline'
        placeholder=''
        className='mb-5'
        inputClassName='resize-none'
      />

      <div className='mb-4 text-center'>
        <Button loading={loading} disabled={loading} htmlType='submit' className='gap-2'>
          {type === 'add' ? 'Add' : 'Update'} Product
        </Button>
      </div>
    </form>
  )
}
