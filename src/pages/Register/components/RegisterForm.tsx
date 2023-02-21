import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form } from 'antd'
import { useForm } from 'react-hook-form'
import { InputField, InputPasswordField } from '@/components/FormFields'
import { FormDataRegister } from '@/types'
import { useRegisterFormSchema } from '@/hooks'

export interface RegisterFormProps {
  initialValues?: FormDataRegister
  onSubmit?: (values: FormDataRegister) => void
}

export function RegisterForm({ initialValues, onSubmit }: RegisterFormProps) {
  const { t } = useTranslation()
  const schema = useRegisterFormSchema()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid }
  } = useForm<FormDataRegister>({
    mode: 'onChange',
    defaultValues: initialValues,
    resolver: yupResolver(schema)
  })

  const handleRegister = async (values: FormDataRegister) => {
    await onSubmit?.(values)
  }

  return (
    <Form colon={false} initialValues={initialValues} onFinish={handleSubmit(handleRegister)}>
      <InputField name='email' control={control} placeholder='abc@email.com' classNameInput='py-2' />
      <InputPasswordField
        name='password'
        control={control}
        type='password'
        placeholder='Mật khẩu'
        classNameInput='py-2'
      />
      <InputPasswordField
        name='confirmPassword'
        control={control}
        type='password'
        placeholder='Nhập lại mật khẩu'
        classNameInput='py-2'
      />

      <Button
        loading={isSubmitting}
        disabled={!isValid}
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
