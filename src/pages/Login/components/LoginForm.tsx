import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form } from 'antd'
import { useForm } from 'react-hook-form'
import { InputField, InputPasswordField } from '@/components/FormFields'
import { FormDataLogin } from '@/types'
import { useLoginFormSchema } from '@/hooks'

export interface LoginFormProps {
  initialValues?: FormDataLogin
  onSubmit?: (values: FormDataLogin) => void
}

export function LoginForm({ initialValues, onSubmit }: LoginFormProps) {
  const schema = useLoginFormSchema()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid }
  } = useForm<FormDataLogin>({
    mode: 'onChange',
    defaultValues: initialValues,
    resolver: yupResolver(schema)
  })

  const handleLogin = async (values: FormDataLogin) => {
    await onSubmit?.(values)
  }

  return (
    <Form colon={false} initialValues={initialValues} onFinish={handleSubmit(handleLogin)}>
      <InputField name='email' control={control} placeholder='abc@email.com' classNameInput='py-2' />
      <InputPasswordField name='password' control={control} placeholder='Mật khẩu' classNameInput='py-2' />

      <Button
        loading={isSubmitting}
        disabled={!isValid}
        type='primary'
        htmlType='submit'
        danger
        className='mx-auto mt-[16px] h-[48px] w-full border-[1px] px-3 py-2 text-[20px] font-medium leading-6'
      >
        Đăng nhập
      </Button>
    </Form>
  )
}
