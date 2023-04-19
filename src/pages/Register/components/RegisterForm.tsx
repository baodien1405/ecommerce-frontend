import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form } from 'antd'
import { useForm } from 'react-hook-form'
import { InputField, InputPasswordField } from '@/components/FormFields'
import { FormDataRegister } from '@/types'
import { useRegisterFormSchema } from '@/hooks'

export interface RegisterFormProps {
  initialValues?: FormDataRegister
  loading?: boolean
  onSubmit?: (values: FormDataRegister) => void
}

export function RegisterForm({ initialValues, loading, onSubmit }: RegisterFormProps) {
  const [t] = useTranslation('register')
  const schema = useRegisterFormSchema()
  const { control, handleSubmit } = useForm<FormDataRegister>({
    defaultValues: initialValues,
    resolver: yupResolver(schema)
  })

  const handleRegister = async (values: FormDataRegister) => {
    await onSubmit?.(values)
  }

  return (
    <Form colon={false} initialValues={initialValues} onFinish={handleSubmit(handleRegister)}>
      <InputField name='name' control={control} placeholder='Nguyen Van A' classNameInput='py-2' />
      <InputField name='email' control={control} placeholder='abc@email.com' classNameInput='py-2' />
      <InputPasswordField
        name='password'
        control={control}
        type='password'
        placeholder='Mật khẩu'
        classNameInput='py-2'
      />

      <Button
        loading={loading}
        disabled={loading}
        type='primary'
        danger
        className='mx-auto mt-[16px] h-[48px] w-full border-[1px] px-3 py-2 text-[20px] font-medium leading-6'
        htmlType='submit'
      >
        {t('sign up')}
      </Button>
    </Form>
  )
}
