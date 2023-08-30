import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { InputField, PasswordField } from '@/components/FormFields'
import { FormDataRegister } from '@/types'
import { useRegisterFormSchema } from '@/hooks'
import Button from '@/components/Button'

export interface RegisterFormProps {
  loading?: boolean
  onSubmit?: (values: FormDataRegister) => void
}

export function RegisterForm({ loading, onSubmit }: RegisterFormProps) {
  const [t] = useTranslation('register')
  const schema = useRegisterFormSchema()

  const { control, handleSubmit } = useForm<FormDataRegister>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const handleRegister = async (values: FormDataRegister) => {
    await onSubmit?.(values)
  }

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <InputField label='Name' name='name' control={control} placeholder='Nguyen Van A' className='mb-5' />
      <InputField label='Email' name='email' control={control} placeholder='abc@email.com' className='mb-5' />
      <PasswordField label='Password' name='password' control={control} placeholder='************' />

      <Button
        loading={loading}
        disabled={loading}
        htmlType='submit'
        className='mx-auto mt-[16px] h-[48px] w-full border-[1px] px-3 py-2 text-base font-medium'
      >
        {t('sign up')}
      </Button>
    </form>
  )
}
