import { useEffect } from 'react'
import { Button, Form } from 'antd'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputField } from '@/components/FormFields'
import { useUserFormSchema } from '@/hooks'
import { User } from '@/types'

type FormDataUser = Pick<User, 'name' | 'email' | 'phone'>

export interface UserFormProps {
  loading?: boolean
  isSuccess?: boolean
  initialValues?: FormDataUser
  onSubmit?: (formValues: FormDataUser) => void
}

export function UserForm({ loading, isSuccess, initialValues, onSubmit }: UserFormProps) {
  const [form] = Form.useForm()
  const schema = useUserFormSchema()

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isValid }
  } = useForm<FormDataUser>({
    mode: 'onChange',
    defaultValues: initialValues,
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (initialValues) {
      Object.entries(initialValues).map(([key, val]) =>
        setValue(key as keyof FormDataUser, String(val), {
          shouldValidate: true
        })
      )
      form.setFieldsValue(initialValues)
    }
  }, [initialValues, form, setValue])

  useEffect(() => {
    if (isSuccess) {
      reset()
      form.resetFields()
    }
  }, [isSuccess, form, reset])

  const handleUserFormSubmit = async (values: FormDataUser) => {
    await onSubmit?.(values)
  }

  return (
    <Form form={form} colon={false} initialValues={initialValues} onFinish={handleSubmit(handleUserFormSubmit)}>
      <InputField name='name' label='Name' control={control} placeholder='Thêm tên' classNameInput='py-2' />

      <InputField name='email' label='Email' control={control} placeholder='abc@gmail.com' classNameInput='py-2' />

      <InputField name='phone' label='Phone' control={control} placeholder='' classNameInput='py-2' />

      <Button
        loading={loading}
        disabled={loading || !isValid}
        type='primary'
        htmlType='submit'
        className='mx-auto block h-10 w-[176px] rounded bg-[#0b74e5]'
      >
        Update
      </Button>
    </Form>
  )
}
