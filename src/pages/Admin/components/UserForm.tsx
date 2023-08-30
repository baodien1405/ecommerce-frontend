import { useEffect } from 'react'
import { Button } from 'antd'
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
    }
  }, [initialValues, setValue])

  useEffect(() => {
    if (isSuccess) {
      reset()
    }
  }, [isSuccess, reset])

  const handleUserFormSubmit = async (values: FormDataUser) => {
    await onSubmit?.(values)
  }

  return (
    <form onSubmit={handleSubmit(handleUserFormSubmit)}>
      <InputField name='name' label='Name' control={control} placeholder='Thêm tên' />

      <InputField name='email' label='Email' control={control} placeholder='abc@gmail.com' />

      <InputField name='phone' label='Phone' control={control} placeholder='' />

      <Button
        loading={loading}
        disabled={loading || !isValid}
        type='primary'
        htmlType='submit'
        className='mx-auto block h-10 w-[176px] rounded bg-[#0b74e5]'
      >
        Update
      </Button>
    </form>
  )
}
