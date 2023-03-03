import { useState } from 'react'
import { Button, Form } from 'antd'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputField, UploadField } from '@/components/FormFields'
import { useProductFormSchema } from '@/hooks'
import { FormDataProduct } from '@/types'

export interface ProductFormProps {
  loading?: boolean
  initialValues?: FormDataProduct
  onSubmit?: (formValues: FormDataProduct) => void
}

export function ProductForm({ loading, initialValues, onSubmit }: ProductFormProps) {
  const [productURL, setProductURL] = useState('')
  const schema = useProductFormSchema()

  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm<FormDataProduct>({
    mode: 'onSubmit',
    defaultValues: initialValues,
    resolver: yupResolver(schema)
  })

  const handleProductUpload = (imageURL: string) => {
    setProductURL(imageURL)
  }

  const handleProductSubmit = async (values: FormDataProduct) => {
    await onSubmit?.({ ...values, image: productURL })
  }

  return (
    <Form colon={false} initialValues={initialValues} onFinish={handleSubmit(handleProductSubmit)}>
      <InputField label='Name' name='name' control={control} placeholder='Thêm tên' classNameInput='py-2' />

      <InputField name='type' label='Type' control={control} placeholder='Thêm loại...' classNameInput='py-2' />

      <InputField
        control={control}
        label='CountInStock'
        name='countInStock'
        placeholder=''
        classNameInput='py-2 w-[100px]'
      />

      <InputField label='Price' name='price' control={control} placeholder='' classNameInput='py-2 w-[100px]' />

      <InputField label='Description' name='description' control={control} placeholder='' classNameInput='py-2' />

      <InputField label='Rating' name='rating' control={control} placeholder='' classNameInput='py-2 w-[50px]' />

      <UploadField
        label='Image'
        name='image'
        className='inline-block w-[200px]'
        accept='image/*'
        listType='picture'
        maxCount={1}
        onChange={handleProductUpload}
      />

      <Button
        loading={loading}
        disabled={!isValid || loading}
        type='primary'
        htmlType='submit'
        className='mx-auto block h-10 w-[176px] rounded bg-[#0b74e5]'
      >
        Add product
      </Button>
    </Form>
  )
}
